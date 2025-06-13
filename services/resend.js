require('dotenv').config
const { Resend } = require("resend");

function resend(email, fullName, date, time, service, code) {
  const resend = new Resend(process.env.API_KEY_RESEND);

  (async function () {
    const { data, error } = await resend.emails.send({
      from: "HairRush <soport@"+process.env.DOMAIN+">",
      to: [email],
      subject: "✅ Confirmación de tu cita",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h1 style="color: #2e7d32; text-align: center;">🌟 ¡Cita Agendada con Éxito! 🌟</h1>
      
      <p>¡Hola <strong>${fullName}</strong>, tu cita para <strong>${service}</strong> ha sido confirmada. ¡Estamos listos para atenderte!</p>
      
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 5px 0;">📅 <strong>Fecha:</strong> ${date}</p>
        <p style="margin: 5px 0;">⏰ <strong>Hora:</strong> ${time}</p>
      </div>
      
      <p>🔹 <strong>Tu código de confirmación:</strong> <span style="background-color: #fff8e1; padding: 3px 6px; border-radius: 4px; font-family: monospace;">${code}</span></p>
      <p>(Guárdalo para cualquier consulta y/o cancelar tu cita).</p>
      
      <div style="margin: 25px 0;">
        <h3 style="color: #2e7d32; border-bottom: 1px solid #e0e0e0; padding-bottom: 5px;">💡 Recomendaciones:</h3>
        <ul style="padding-left: 20px;">
          <li>Llega 10 minutos antes.</li>
          <li>Trae tu identificación oficial.</li>
        </ul>
      </div>
      
      <p style="font-style: italic;">¿Necesitas reprogramar o tienes dudas? Contáctanos respondiendo a este mensaje.</p>
      
      <p style="text-align: center; margin-top: 30px;">¡Gracias por confiar en nosotros! Estamos emocionados de verte pronto. 😊</p>
      
      <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
        <p><strong>HairRush</strong></p>
        <p>🔗 <a href="" style="color: #1565c0;">Visita nuestro sitio</a> | 📱 Síguenos en</p>
      </div>
    </div>
  `,
    });

    if (error) {
      return console.error({ error });
    }

    console.log({ data });
  })();
}

module.exports = { resend };
