import nodemailer from 'nodemailer';
import pug from 'pug';
import path from 'path';
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: Number(EMAIL_PORT),
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

type Template = {
	subject: string;
	file: string;
};

const Email = {
  async sendMail(email: string, template: Template, data = {}) {
    const html = pug.renderFile(`${path.resolve('emails', template.file)}`, data);

    await transporter.sendMail({
      from: `Ucode Uevent`,
      to: email,
      subject: template.subject,
      html,
    });
  },
};

export default Email;

