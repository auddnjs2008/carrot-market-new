/** @type {import('next').NextConfig} */
const nextConfig = {
    experiemntal:{
        taint:true
    },
    logging:{
        fetches:{
            fullUrl:true
        }
    },
    images:{
        remotePatterns:[
            {
                hostname:'avatars.githubusercontent.com'
            },
            {
                hostname:'imagedelivery.net'
            },
           
        ]
    }
};

export default nextConfig;
