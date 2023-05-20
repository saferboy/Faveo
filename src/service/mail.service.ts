import { EMAIL, EMAIL_PASSWORD } from "@config/verification";
import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Mail from "nodemailer/lib/mailer";


const transporter = nodemailer.createTransport(new SMTPTransport({
    service:    'gmail',
    host:   'smpt.gmail.com',
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
})) 

export const sendEmail = async (email: string, code: string) => {

    const mailOPtion: Mail.Options = {
        from: EMAIL,
        to: EMAIL,
        subject: 'Email verification',
        text: `${email}, This is code to verify account : ${code}`
    }

    const info = await transporter.sendMail(mailOPtion)
    console.log('Send mail ' + info.response)

}