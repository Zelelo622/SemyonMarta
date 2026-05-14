import type { VercelRequest, VercelResponse } from '@vercel/node'

const TARGET_EMAIL = 'svd36@inbox.ru'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const origin = req.headers.origin ?? 'https://semyon-marta.vercel.app'

    const upstream = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: origin,
        Referer: origin + '/',
        'User-Agent': 'Mozilla/5.0 (compatible; wedding-rsvp/1.0)',
      },
      body: JSON.stringify(req.body),
    })

    const text = await upstream.text()
    console.log(`formsubmit status=${upstream.status} body=${text}`)
    const data = (() => { try { return JSON.parse(text) } catch { return { raw: text } } })()
    return res.status(upstream.status).json(data)
  } catch (err) {
    console.error('RSVP proxy error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
