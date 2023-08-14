import nodemailer from 'nodemailer';
import User from '@/models/userModel'

export const sendPasswordEmail = async ({ email, emailType, userId }: any) => {
    try {
        //check if email is verified
        //credentials for nodemailer
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILER_USERNAME,
                pass: process.env.MAILER_PASSWORD
            }
        });

        const mailOptions = {
            from: 'adamwest023@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
            or copy and paste the link below in your browser. 
            <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`
        }

        const mailResponse = await transport.sendMail
            (mailOptions);
        return mailResponse;


    } catch (error: any) {
        throw new Error(error.message);
    }

}