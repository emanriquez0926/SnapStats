import fetch from "node-fetch";

export async function handler() {
    const apiKey = process.env.API_SPORTS_KEY;
    const url = "https://v1.basketball.api-sports.io/players?league=12&season=2025";

    try {
        const response = await fetch(url, { headers: { "x-apisports-key": apiKey } });
        const data = await response.json();
        return { statusCode: 200, body: JSON.stringify(data.response) };
    } catch (err) {
        return { statusCode: 500, body: err.toString() };
    }
}