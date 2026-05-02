import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
            required: true,
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // El contenido de texto (ahora opcional porque un mensaje puede ser solo un audio)
        content: {
            type: String,
            default: "",
        },
        // NUEVO: Identificar qué tipo de mensaje es
        type: {
            type: String,
            enum: ["text", "audio", "image", "file"],
            default: "text",
        },
        // NUEVO: La URL del archivo alojado 
        fileUrl: {
            type: String,
            default: null,
        },
        // NUEVO (Ideal para audios): Duración en segundos para la UI del reproductor móvil
        duration: {
            type: Number,
            default: null,
        },
        status: {
            type: String,
            enum: ["sent", "delivered", "read"],
            default: "sent",
        },
        isEdited: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedFor: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Message", messageSchema);