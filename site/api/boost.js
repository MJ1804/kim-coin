// Vercel Serverless — POST /api/boost
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { petitionId, amount, walletAddress } = req.body || {};

  if (!petitionId || !amount) {
    return res.status(400).json({ error: 'petitionId and amount are required.' });
  }

  if (typeof amount !== 'number' || amount <= 0 || amount > 100000) {
    return res.status(400).json({ error: 'Invalid boost amount.' });
  }

  // In-memory boost store (resets on cold start — demo only)
  if (!global.kimBoosts) global.kimBoosts = {};
  if (!global.kimBoosts[petitionId]) global.kimBoosts[petitionId] = 0;

  global.kimBoosts[petitionId] += Math.ceil(amount / 10);

  return res.status(200).json({
    success: true,
    petitionId,
    boostAdded: Math.ceil(amount / 10),
    totalBoosts: global.kimBoosts[petitionId]
  });
}
