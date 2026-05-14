import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { _subject, message } = req.body as { _subject: string; message: string }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: _subject ?? 'RSVP — свадьба',
      text: message,
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('SMTP error:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
