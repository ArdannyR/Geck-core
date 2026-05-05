import sendMail from "../config/nodemailer.js";

export const sendRegistrationEmail = (userMail, token) => {
    return sendMail(
        userMail,
        "Bienvenido a VirtualDesk - Confirma tu cuenta",
        `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h1 style="color: #4A90E2;">¡Bienvenido a VirtualDesk!</h1>
                <p>Hola, haz clic en el siguiente botón para confirmar tu cuenta y empezar a organizar tu vida digital:</p>
                <a href="${process.env.URL_FRONTEND}/confirmar/${token}" 
                   style="display: inline-block; padding: 10px 20px; background-color: #4A90E2; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                    Confirmar mi cuenta
                </a>
                <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;">
                <footer style="font-size: 12px; color: #888;">El equipo de VirtualDesk te da la más cordial bienvenida.</footer>
            </div>
        `
    );
};

export const sendPasswordRecoveryEmail = (userMail, token) => {
    return sendMail(
        userMail,
        "VirtualDesk - Recupera tu contraseña",
        `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h1 style="color: #E24A4A;">VirtualDesk</h1>
                <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para crear una nueva:</p>
                <a href="${process.env.URL_FRONTEND}/reset/${token}" 
                   style="display: inline-block; padding: 10px 20px; background-color: #E24A4A; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                    Restablecer mi contraseña
                </a>
                <p style="font-size: 14px; color: #666;">Si no solicitaste este cambio, puedes ignorar este correo.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;">
                <footer style="font-size: 12px; color: #888;">El equipo de VirtualDesk.</footer>
            </div>
        `
    );
};

export const sendWorkspaceInviteEmail = ({ to, inviterName, workspaceName, token, workspaceId }) => {
    const acceptUrl = ${process.env.URL_FRONTEND}/workspace/accept/${token};
    
    return sendMail(
        to,
        ${inviterName} te invitó a "${workspaceName}" en VirtualDesk,
        `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #6366f1;">🚀 Invitación a Espacio de Trabajo</h1>
            
            <div style="background: #f8fafc; border-left: 4px solid #6366f1; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0;"><strong>${inviterName}</strong> te ha invitado a unirte al espacio de trabajo:</p>
                <h2 style="color: #6366f1; margin: 8px 0;">${workspaceName}</h2>
            </div>
            
            <p>Haz clic en el siguiente botón para aceptar la invitación y unirte al equipo:</p>
            
            <a href="${acceptUrl}" 
               style="display: inline-block; padding: 14px 28px; background-color: #6366f1; color: white; 
                      text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; font-size: 16px;">
                ✅ Aceptar Invitación
            </a>
            
            <p style="color: #888; font-size: 13px;">
                ⚠️ Este enlace expirará en <strong>48 horas</strong>.<br>
                Si no esperabas esta invitación, puedes ignorar este correo.
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;">
            <footer style="font-size: 12px; color: #888;">El equipo de VirtualDesk.</footer>
        </div>
        `
    );
};