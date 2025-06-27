  const axios = require('axios');

  const STEAM_API_KEY = process.env.STEAM_API_KEY;

  if (!STEAM_API_KEY) {
  console.error('Steam API key not loaded. Check your .env file.');
}

  const getPlayerSummaries = async (steamId) => {
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamId}`;
    const response = await axios.get(url);
    return response.data.response.players[0];
  };
  

  const getOwnedGames = async (steamId) => {
    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${steamId}&include_appinfo=true&include_played_free_games=true`;
    const response = await axios.get(url);
    return response.data.response.games || [];
  };

  const getTotalPlaytime = async (steamId) => {
    const games = await getOwnedGames(steamId);
    const totalMinutes = games.reduce((sum, g) => sum + g.playtime_forever, 0);
    return { hours: Math.round(totalMinutes / 60), gameCount: games.length };
  };

  const getRecentActivity = async (steamId) => {
    const url = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_API_KEY}&steamid=${steamId}`;
    const response = await axios.get(url);
    return response.data.response.games || [];
  };


  //STEAM OVERVIEW LOGIC

  const getSteamOverview = async (steamId) => {
    const [player, games, recent] = await Promise.all([
      getPlayerSummaries(steamId),
      getOwnedGames(steamId),
      getRecentActivity(steamId)
    ]);

    const totalMinutes = games.reduce((sum, g) => sum + g.playtime_forever, 0);
    const topGames = [...games]
      .sort((a, b) => b.playtime_forever - a.playtime_forever)
      .slice(0, 5);

    return {
      username: player.personaname,
      avatar: player.avatarfull,
      totalPlaytime: totalMinutes, 
      ownedGames: games,         
      recentGames: recent,
    };
  };

  module.exports = { getPlayerSummaries, getOwnedGames, getTotalPlaytime, getRecentActivity, getSteamOverview };

