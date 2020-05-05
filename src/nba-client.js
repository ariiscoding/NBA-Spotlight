import nba from 'nba';

const SERVER_URL = 'https://nba.laiprojects.com';

export default {
    ...nba, //this is called spread: importing everything else in nba as well
    stats: {
        ...nba.stats,
        playerInfo: function ({ PlayerID }) { //playerInfo is a function to get data from our custom server
            return fetch(`${SERVER_URL}/players/${PlayerID}`).then(res => res.json())
        },
        shots: function({ PlayerID }) {
            return fetch(`${SERVER_URL}/players/${PlayerID}/shots`).then(res => res.json())
        },
    },
};