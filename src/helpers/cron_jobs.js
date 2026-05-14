import cron from 'node-cron';
import { v2 as cloudinary } from 'cloudinary';
import Message from '../models/Message.js';

export const initCronJobs = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('[Cron] Iniciando limpieza de archivos expirados...');

    try {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      const expiredMessages = await Message.find({
        type: { $in: ['file', 'audio'] },
        filePublicId: { $ne: null },
        createdAt: { $lt: twentyFourHoursAgo }
      });

      if (expiredMessages.length === 0) {
        console.log('[Cron] No hay archivos expirados para limpiar.');
        return;
      }

      console.log(`[Cron] ${expiredMessages.length} archivo(s) expirado(s) encontrado(s).`);

      for (const message of expiredMessages) {
        try {
          const resourceType = message.type === 'audio' ? 'video' : 'raw';

          await cloudinary.uploader.destroy(message.filePublicId, {
            resource_type: resourceType
          });

          await Message.findByIdAndUpdate(message._id, {
            fileUrl: null,
            filePublicId: null,
            content: 'Archivo expirado'
          });

          console.log(`[Cron] Archivo ${message.filePublicId} eliminado correctamente.`);
        } catch (error) {
          console.error(`[Cron] Error al procesar mensaje ${message._id}:`, error.message);
        }
      }

      console.log('[Cron] Limpieza de archivos expirados completada.');
    } catch (error) {
      console.error('[Cron] Error en la limpieza de archivos expirados:', error);
    }
  });
};
