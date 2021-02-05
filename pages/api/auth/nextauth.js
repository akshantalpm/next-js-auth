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
  if (token) {
    if(user) {
      user.data = "abcd"
    }
    return Promise.resolve({ ...token, ...user, ...account, ...profile });
  }
}

callbacks.session = async (session, user, sessionToken) => {
  console.log(user)
  return Promise.resolve({ ...session, ...user, ...sessionToken })
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