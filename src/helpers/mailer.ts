import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";


export const sendEmail = async ({ email, emailType, userId }: any) => {
    
    try {
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        //create a transporter 
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILER_USERNAME!,
                pass: process.env.MAILER_PASSWORD!
            }
        });

        const mailOptions = {
            from: 'adamwest023@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: emailType === "VERIFY" ? `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : 'updatepassword'}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
            or copy and paste the link below in your browser. 
            <br>${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : 'updatepassword'}?token=${hashedToken} </p>` : `<p>Click <a href="${process.env.DOMAIN}/updatepassword?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
            or copy and paste the link below in your browser. 
            <br>${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : 'updatepassword'}?token=${hashedToken} </p>`
        }

        const mailResponse = await transport.sendMail
            (mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}
