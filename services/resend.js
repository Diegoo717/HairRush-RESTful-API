require("dotenv").config;
const { Resend } = require("resend");

function resend(email, fullName, date, time, service, code) {
  const resend = new Resend(process.env.API_KEY_RESEND);

  (async function () {
    const { data, error } = await resend.emails.send({
      from: "HairRush <soport@" + process.env.DOMAIN + ">",
      to: [email],
      subject: "✅ Confirmación de tu cita",
      html: `
        <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Foundation:wght@400;700&family=Edu+NSW+ACT+Cursive:wght@400;700&display=swap');
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #0D0E10; color: #ffffff;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #1f2124; border: 1px solid #42474d; border-radius: 15px; overflow: hidden; margin-top: 20px; margin-bottom: 20px;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #141414 0%, #2c2f33 100%); padding: 30px 20px; text-align: center; border-bottom: 2px solid #42474d;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 1px;">
              <span style="font-family: 'Edu NSW ACT Cursive', cursive; font-weight: 400;">Hair</span><span style="font-family: 'Edu NSW ACT Cursive', cursive; font-weight: 700;">Rush</span>
            </h1>
            <div style="height: 2px; width: 60px; background: linear-gradient(90deg, #42474d, #ffffff, #42474d); margin: 15px auto;"></div>
            <p style="color: #cccccc; margin: 10px 0 0 0; font-size: 16px;">Confirmación de Cita</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px;">
            <!-- Success Icon -->
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #141414 0%, #2c2f33 100%); border: 2px solid #42474d; border-radius: 50%; display: inline-block; text-align: center; line-height: 80px; box-shadow: 0 0 20px rgba(255, 255, 255, 0.1); font-size: 36px; font-weight: bold; color: #ffffff;">
                ✓
              </div>
            </div>

            <!-- Greeting -->
            <h2 style="color: #ffffff; text-align: center; font-size: 24px; font-weight: 300; margin-bottom: 30px;">
                Hola <strong style="font-weight: 600;">${fullName}</strong>,<br>
                <span style="font-size: 18px; color: #cccccc;">tu cita ha sido confirmada con éxito</span>
            </h2>

            <!-- Service Details -->
            <div style="background: linear-gradient(135deg, #141414 0%, #1a1c1f 100%); padding: 25px; border-radius: 12px; border: 1px solid #42474d; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">
                <h3 style="color: #ffffff; font-size: 18px; margin-top: 0; margin-bottom: 20px; text-align: center; font-weight: 400; letter-spacing: 0.5px;">DETALLES DE LA CITA</h3>
                
                <!-- Fecha y Hora en columna -->
                <div style="margin-bottom: 20px;">
                  <!-- Fecha -->
                  <div style="text-align: center; padding: 15px; background-color: rgba(66, 71, 77, 0.2); border-radius: 8px; margin-bottom: 15px;">
                    <div style="color: #cccccc; font-size: 14px; margin-bottom: 5px;">📅 FECHA</div>
                    <div style="color: #ffffff; font-size: 16px; font-weight: 600;">${date}</div>
                  </div>
                  
                  <!-- Hora -->
                  <div style="text-align: center; padding: 15px; background-color: rgba(66, 71, 77, 0.2); border-radius: 8px; margin-bottom: 15px;">
                    <div style="color: #cccccc; font-size: 14px; margin-bottom: 5px;">⏰ HORA</div>
                    <div style="color: #ffffff; font-size: 16px; font-weight: 600;">${time}</div>
                  </div>
                </div>

                <!-- Servicio -->
                <div style="text-align: center; padding: 15px; background-color: rgba(66, 71, 77, 0.2); border-radius: 8px; margin-bottom: 20px;">
                    <div style="color: #cccccc; font-size: 14px; margin-bottom: 5px;">✂️ SERVICIO</div>
                    <div style="color: #ffffff; font-size: 16px; font-weight: 600;">${service}</div>
                </div>

                <!-- Código de confirmación -->
                <div style="text-align: center; padding: 20px; background-color: rgba(255, 255, 255, 0.05); border-radius: 8px; border: 1px dashed #42474d;">
                    <div style="color: #cccccc; font-size: 14px; margin-bottom: 10px;">🔐 CÓDIGO DE CONFIRMACIÓN</div>
                    <div style="color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: 2px; font-family: monospace; background: linear-gradient(135deg, #141414 0%, #2c2f33 100%); padding: 10px 20px; border-radius: 6px; border: 1px solid #42474d; display: inline-block;">${code}</div>
                    <div style="color: #999999; font-size: 12px; margin-top: 10px;">Guarda este código para cualquier consulta o modificación</div>
                </div>
            </div>

            <!-- Recommendations -->
            <div style="background: linear-gradient(135deg, #141414 0%, #1a1c1f 100%); padding: 25px; border-radius: 12px; border: 1px solid #42474d; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">
                <h3 style="color: #ffffff; font-size: 18px; margin-top: 0; margin-bottom: 20px; text-align: center; font-weight: 400; letter-spacing: 0.5px;">💡 RECOMENDACIONES DELUXE</h3>
                
                <div style="display: grid; grid-template-columns: 1fr; gap: 12px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 24px; height: 24px; background: linear-gradient(135deg, #42474d 0%, #2c2f33 100%); border-radius: 50%; text-align: center; line-height: 24px; flex-shrink: 0; color: #ffffff; font-size: 14px;">⏱</div>
                        <div style="color: #cccccc; font-size: 14px; padding-left: 8px;">Llega 10 minutos antes de tu cita programada</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 24px; height: 24px; background: linear-gradient(135deg, #42474d 0%, #2c2f33 100%); border-radius: 50%; text-align: center; line-height: 24px; flex-shrink: 0; color: #ffffff; font-size: 14px;">📋</div>
                        <div style="color: #cccccc; font-size: 14px; padding-left: 8px;">Trae identificación oficial para verificación</div>
                    </div>
                </div>
            </div>

            <!-- Contact Info -->
            <div style="text-align: center; padding: 20px; background-color: rgba(66, 71, 77, 0.1); border-radius: 8px; border: 1px solid #42474d;">
                <p style="color: #cccccc; font-size: 14px; margin: 0; font-style: italic;">
                    ¿Necesitas reprogramar o tienes preguntas? Responde a este correo para asistencia inmediata.
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div style="background: linear-gradient(135deg, #141414 0%, #1a1c1f 100%); padding: 30px 20px; text-align: center; border-top: 2px solid #42474d;">
            <p style="color: #999999; font-size: 14px; margin: 0 0 15px 0;">Gracias por elegir la experiencia premium de</p>
            <h3 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 300;">
              <span style="font-family: 'Edu NSW ACT Cursive', cursive; font-weight: 400;">Hair</span><span style="font-family: 'Edu NSW ACT Cursive', cursive; font-weight: 700;">Rush</span>
            </h3>
            <p style="color: #666666; font-size: 12px; margin: 20px 极 0;">© 2024 HairRush. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
      `,
    });

    if (error) {
      return console.error({ error });
    }

    console.log({ data });
  })();
}

module.exports = { resend };
