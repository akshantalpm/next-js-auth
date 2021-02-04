import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const providers = [
  Providers.GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  }),
  Providers.Apple({
   clientId: process.env.CLIENT_ID,
    clientSecret: {
      appleId: process.env.CLIENT_ID,
      teamId: "3JRGPHC3AW",
      privateKey: process.env.access_key,
      keyId: process.env.key_id,
    }
  })
]

const callbacks = {}

/**
 * @param  {object} session      Session object
 * @param  {object} user         User object    (if using database sessions)
 *                               JSON Web Token (if not using database sessions)
 * @return {object}              Session that will be returned to the client
 */

callbacks.jwt = async (token, user, account, profile) => {
    console.log("JWT API callback triggered")
    console.log(token)
    // user.accessToken = "eyJraWQiOiI4NkQ4OEtmIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLmRlc2VydmUuZGVzZXJ2ZUNhcmRTdGFnZVdlYiIsImV4cCI6MTYxMjUyNzA1MywiaWF0IjoxNjEyNDQwNjUzLCJzdWIiOiIwMDE4MTQuMDJkMzUxZjE4Njk0NDM1ZDhjMzA4MTNkZDEyMTVkZDQuMDkzNSIsImF0X2hhc2giOiJJV3duZ0NGTWlnLTFMeUxVYlhaWVhnIiwiZW1haWwiOiJwb29qYS5ib25naXJ3YXJAZGVzZXJ2ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6InRydWUiLCJhdXRoX3RpbWUiOjE2MTI0NDA2NTIsIm5vbmNlX3N1cHBvcnRlZCI6dHJ1ZX0.Dj_4gU8F41sW3ti0ohFHPknNOCrIbq7BNmGvGGUUdC7W9wmbvTEaW_l9gLrNlqK23QtPlBC_xqhOvRQTmtMdtESOWdVvS-HbGySwsojwwugCb-01Q6Fh3AXDMYShnv0F9OJygs3R8gzVF14DWnL9fBFCiz_b2scEGS_jGgWXfw0mQjq96BFmlILQFs4j2kCo284qypaQBwyY2Y7ODMJ5zOv-Xsh2-I_puYx0O_XZzA0BebRVP8JSeiSHRjPO9CIcLtwg9sPsex-5warRSTIGKJOSqzXTwZBZfma0GWUjsCYlZXyd_n8QIBOKKWD53p5kGdaACbbHJJ2XFjW-4Ya8gw"
    if (token) {
        console.log("JWT API callback triggered")
        return Promise.resolve({...token, ...user, ...account, ...profile});
    }
}

callbacks.session = async (session, user, sessionToken) => {
    console.log(user)
    return Promise.resolve({...session, ...user, ...sessionToken})
}


const options = {
  providers,
  session: {
    jwt: true
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  callbacks
}


export default (req, res) => NextAuth(req, res, options)
