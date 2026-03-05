const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const supabase = require('../config/supabase');

// SIMULACIÓN: Envío de email (en producción usar Resend)
const sendPasswordResetEmail = async (to, resetUrl) => {
  console.log('==========================================');
  console.log('📧 EMAIL SIMULADO ENVIADO');
  console.log('Para:', to);
  console.log('Link:', resetUrl);
  console.log('==========================================');
  return { success: true };
};

// POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email es requerido' 
      });
    }

    // Buscar usuario
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, full_name')
      .eq('email', email)
      .single();

    if (userError || !user) {
      return res.status(200).json({ 
        success: true, 
        message: 'Si el email existe, recibirás instrucciones' 
      });
    }

    // Generar token único
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Guardar token en BD
    const { error: insertError } = await supabase
      .from('password_resets')
      .insert({
        user_id: user.id,
        token: token,
        expires_at: expiresAt.toISOString(),
        used: false
      });

    if (insertError) throw insertError;

    // SIMULAR envío de email (imprime en consola)
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    await sendPasswordResetEmail(user.email, resetUrl);

    res.status(200).json({ 
      success: true, 
      message: 'Si el email existe, recibirás instrucciones',
      // En desarrollo, incluimos el token para pruebas
      debug: { token: token, url: resetUrl }
    });

  } catch (error) {
    console.error('Error en forgotPassword:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error procesando solicitud' 
    });
  }
};

// POST /api/auth/reset-password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Token y nueva contraseña son requeridos' 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'La contraseña debe tener al menos 6 caracteres' 
      });
    }

    // Buscar token válido
    const { data: resetRecord, error: findError } = await supabase
      .from('password_resets')
      .select('*')
      .eq('token', token)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (findError || !resetRecord) {
      return res.status(400).json({ 
        success: false, 
        message: 'Token inválido o expirado' 
      });
    }

    // Hashear nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar contraseña usuario
    const { error: updateError } = await supabase
      .from('users')
      .update({ password: hashedPassword })
      .eq('id', resetRecord.user_id);

    if (updateError) throw updateError;

    // Marcar token como usado
    await supabase
      .from('password_resets')
      .update({ used: true })
      .eq('token', token);

    res.status(200).json({ 
      success: true, 
      message: 'Contraseña actualizada exitosamente' 
    });

  } catch (error) {
    console.error('Error en resetPassword:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error actualizando contraseña' 
    });
  }
};

module.exports = { forgotPassword, resetPassword };
