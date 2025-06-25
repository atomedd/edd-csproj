const axios = require('axios');

const STEAM_API_KEY = process.env.STEAM_API_KEY;

const getPlayerSummaries = async (steamId) => {
  const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamId}`;
  const response = await axios.get(url);
  return response.data.response.players[0];
};

module.exports = { getPlayerSummaries };

