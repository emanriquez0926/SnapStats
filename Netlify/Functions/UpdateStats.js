import fetch from "node-fetch";

export async function handler() {
  const apiKey = process.env.API_SPORTS_KEY; // Make sure this matches your Netlify environment variable
  const url = "https://v1.basketball.api-sports.io/players?league=12&season=2025";

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key not set in environment variables." })
    };
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "x-apisports-key": apiKey }
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `API request failed: ${response.statusText}` })
      };
    }

    const data = await response.json();

    // Make sure data.response exists
    if (!data.response) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "No data returned from API." })
      };
    }

    // Return only top 10 players to reduce load (optional)
    const topPlayers = data.response.slice(0, 10).map(p => ({
      name: p.player.firstname + " " + p.player.lastname,
      team: p.player.team.name,
      points: p.statistics[0].points,
      rebounds: p.statistics[0].totReb,
      assists: p.statistics[0].assists
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(topPlayers)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
