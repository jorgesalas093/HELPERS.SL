const nodemailer = require("nodemailer");

// Create a transporter
module.exports.transporter = nodemailer.createTransport({
    service: "gmail", // Use your preferred email service
    auth: {
        user: process.env.NODEMAILER_EMAIL, // Your email
        pass: process.env.NODEMAILER_PASSWORD, // Your email account password or app-specific password
    },
});

// Create email template
module.exports.createEmailTemplate = (user) => {
    return `
    <html>
    <head>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #f2f4f8;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #3e8ef7;
                color: #fff;
                padding: 20px;
                text-align: center;
            }
            .content {
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
            }
            .footer {
                background-color: #3e8ef7;
                color: #fff;
                padding: 20px;
                text-align: center;
            }
            .image-container {
                text-align: center;
            }
            .image-container img {
                max-width: 100%;
                height: auto;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Bienvenido ${user.username}</h1>
            </div>
            <div class="content">
                <h2>Helpers SL</h2>
                <p>Te ayudamos a que te ayuden</p>
                <div class="image-container">
                    <img src="https://res.cloudinary.com/dwahroldl/image/upload/v1708512110/HelpersLogo/wrqgjyqqk72pteu7r3yg.jpg" alt="Logo Helpers SL">
                // </div>
                <p>Activa tu cuenta haciendo clic en el siguiente enlace:</p>
                <p><a href="https://helpers-sl.netlify.app/activate/${user.activationToken}" target="_blank">Activar cuenta</a></p>
                </div>
            <div class="footer">
                <p>WEB</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
