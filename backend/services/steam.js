const axios = require('axios');

const STEAM_API_KEY = process.env.STEAM_API_KEY;

const getPlayerSummaries = async (steamId) => {
  const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamId}`;
  const response = await axios.get(url);
  return response.data.response.players[0];
};

const getOwnedGames = async (steamId) => {
  const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${steamId}&include_appinfo=true&include_played_free_games=true`;
  const response = await axios.get(url);
  return response.data.response.games || [];
};

const getTotalPlaytime = async (steamId) => {
  const games = await getOwnedGames(steamId);
  const totalMinutes = games.reduce((sum, g) => sum + g.playtime_forever, 0);
  return { hours: Math.round(totalMinutes / 60), gameCount: games.length };
};

const getRecentActivity = async (steamId) => {
  const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_API_KEY}&steamid=${steamId}`;
  const response = await axios.get(url);
  return response.data.response.games || [];
};




module.exports = { getPlayerSummaries, getOwnedGames, getTotalPlaytime, getRecentActivity };

