const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendPasswordResetEmail = async (to, resetUrl) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'VivaCOL <onboarding@resend.dev>', // o tu dominio verificado
      to: [to],
      subject: 'Recuperación de contraseña - VivaCOL',
      html: `
        <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background: linear-gradient(135deg, #272953 0%, #313467 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: #F5CF4A; margin: 0; font-size: 28px;">VivaCOL</h1>
            <p style="color: #EDEAE6; margin: 10px 0 0 0;">Recuperación de contraseña</p>
          </div>
          <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #272953; margin-top: 0;">Hola,</h2>
            <p style="color: #333; line-height: 1.6;">Recibimos una solicitud para restablecer tu contraseña. Haz clic en el botón de abajo para crear una nueva contraseña:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background: #F5CF4A; color: #272953; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">Restablecer contraseña</a>
            </div>
            <p style="color: #666; font-size: 14px;">Este enlace expirará en 1 hora por seguridad.</p>
            <p style="color: #666; font-size: 14px;">Si no solicitaste esto, ignora este correo.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">VivaCOL - Explora Colombia</p>
          </div>
        </div>
      `
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error enviando email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendPasswordResetEmail };