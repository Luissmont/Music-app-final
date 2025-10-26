export const bd_conection = {}
export const spotify_environments = {

    API_URL: 'https://api.spotify.com/v1/',
    AUTH_API_URL: 'https://accounts.spotify.com/ai/token',
    CLIENT_ID: '4125beb8718d4975985073ba6a3b1347' ,
    CLIENT_SECRET:'ae4bfe6a0176486593bb610fd9b9ba2a' ,
}

export const environment ={
    production: false,
    AUTH_API_URL: spotify_environments.AUTH_API_URL,
    API_URL: spotify_environments.API_URL,
    CLIENT_ID:spotify_environments.CLIENT_ID,
    CLIENT_SECRET: spotify_environments.CLIENT_SECRET,
};
