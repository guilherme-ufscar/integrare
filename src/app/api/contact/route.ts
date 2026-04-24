import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, company, size, email, phone, message } = await req.json()

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.integrarecorp.com.br',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || 'contato@integrarecorp.com.br',
        pass: process.env.SMTP_PASS || 'CoderMaster#2026',
      },
    })

    const mailOptions = {
      from: process.env.SMTP_USER || 'contato@integrarecorp.com.br',
      to: 'contato@integrarecorp.com.br',
      subject: `Nova Solicitação Comercial: ${company || 'Não informada'} - ${name}`,
      text: `Você recebeu uma nova solicitação de contato pelo site.\n\nNome: ${name}\nEmpresa: ${company}\nTamanho da Empresa: ${size}\nE-mail: ${email}\nTelefone: ${phone}\n\nMensagem:\n${message}`,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: 'Email enviado com sucesso.' })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ success: false, error: 'Falha ao enviar e-mail.' }, { status: 500 })
  }
}
