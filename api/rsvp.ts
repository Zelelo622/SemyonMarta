import type { VercelRequest, VercelResponse } from '@vercel/node'

const TARGET_EMAIL = 'svd36@inbox.ru'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const upstream = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(req.body),
    })

    const data = await upstream.json().catch(() => ({}))
    return res.status(upstream.status).json(data)
  } catch (err) {
    console.error('RSVP proxy error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
