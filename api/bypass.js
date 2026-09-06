// api/bypass.js
const { bypass } = require('../bypass.js');

module.exports = async (req, res) => {
  // CORS biar aman (padahal satu origin)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const result = await bypass(url);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      author: 'Baim',
      input_url: url,
      message: err.message,
    });
  }
};
