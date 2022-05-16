import sendgrid from '@sendgrid/mail';
import fs from 'node:fs';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

interface IParams {
  id: string;
  name: string;
  email: string;
}

async function sendEmail({ id, name, email }: IParams) {
  try {
    const file = fs.readFileSync(`${id}.pdf`).toString("base64");
    await sendgrid.send({
      to: email, // Your email where you'll receive emails
      from: 'contato@sierradeltainformatica.com.br', // your website email address here
      subject: `Contato - ${name}`,
      attachments: [
        {
          content: file,
          filename: 'Certificado.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
          contentId: id,
        },
      ],
      html: `<div>
        <p><strong>Nome: </strong>${name}</p>
        <br />
        <p>Seu certificado está aqui embaixo 👇🏾</p>
      </div>`,
    });
    fs.unlinkSync(`${id}.pdf`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default sendEmail;
