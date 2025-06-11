/*
        const resend = new Resend(process.env.API_KEY_RESEND);

        (async function () {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email],
            subject: 'Hello World baby ;)',
            html: '<strong>It works!</strong>',
        });

        if (error) {
            return console.error({ error });
        }

        console.log({ data });
        })();
        
*/