
const getAccessToken = async (code:string) => {
    let accessTokenURL = "https://github.com/login/oauth/access_token";
    const accessTokenParams = new URLSearchParams({
        client_id:process.env.GITHUB_CLIENT_ID!,
        client_secret:process.env.GITHUB_CLIENT_SECRET!,
        code,

    }).toString();


    accessTokenURL = `${accessTokenURL}?${accessTokenParams}`

    const result = await (await fetch(accessTokenURL,{
        method:'POST',
        headers:{
            Accept:'application/json'
        }
    })).json();

    return result;
}

export default getAccessToken;