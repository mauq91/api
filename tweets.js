export default async function handler(req, res) {
  const username = "gonza_banda"; // 👈 cambia si quieres otra cuenta
  const bearerToken = process.env.TWITTER_BEARER_TOKEN; // viene de Vercel

  try {
    const response = await fetch(
      `https://api.twitter.com/2/tweets/search/recent?query=from:${username}&tweet.fields=created_at,text`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
