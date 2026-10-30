// Vercel Serverless — GET/POST /api/petition
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // In-memory store for demo (resets on cold start — this is fine for v1)
  if (!global.kimPetitions) {
    global.kimPetitions = [];
  }

  if (req.method === 'GET') {
    return res.status(200).json({ petitions: global.kimPetitions });
  }

  if (req.method === 'POST') {
    const { name, event, amount, chain, wallet, story, evidence } = req.body || {};

    if (!name || !event || !amount || !chain || !story) {
      return res.status(400).json({ error: 'Missing required fields: name, event, amount, chain, story' });
    }

    if (story.length < 20) {
      return res.status(400).json({ error: 'Story must be at least 20 characters.' });
    }

    const id = String(global.kimPetitions.length + 42).padStart(4, '0');
    const petition = {
      id,
      name,
      event,
      amount,
      chain,
      wallet: wallet || null,
      story,
      evidence: evidence || null,
      status: 'pending',
      boosts: 0,
      submittedAt: new Date().toISOString()
    };

    global.kimPetitions.unshift(petition);
    return res.status(201).json({ id, status: 'pending', message: 'Petition received and under review.' });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}
