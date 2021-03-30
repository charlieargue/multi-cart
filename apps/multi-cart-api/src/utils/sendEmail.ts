import * as nodemailer from "nodemailer";

// TODO: this is just temporary...
export async function sendEmail(to: string, html: string) {

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PWD,
        },
    });

    const info = await transporter.sendMail({
        from: '"💎" <hold@gme.com>',
        to,
        subject: "💎 Change Password",
        html: html
    });

    console.log("💎 💎 💎 Message sent 💎 💎 💎 : %s", info.messageId);
    console.log("💎 💎 💎 Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

