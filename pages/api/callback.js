const AppleAuth = require('apple-auth');
import { serialize } from 'cookie';

export default async function handler(req, res) {
    const config = {
        "client_id": process.env.CLIENT_ID,
        "team_id": "3JRGPHC3AW",
        "key_id": process.env.key_id,
        "redirect_uri": process.env.redirect_uri,
        "scope": "name email"
    }

    let auth = new AppleAuth(config, process.env.access_key, 'text');

    if (req.method === 'POST') {
        try {
            const response = await auth.accessToken(req.body.code);

            const user = {};
            user.idToken = response.id_token;
            user.accessToken = response.access_token;
            res.setHeader('Set-Cookie', serialize('token', response.id_token, { path: '/' }));
            res.status(200).json(user);
        } catch (ex) {
            console.error(ex);
            res.send("An error occurred!");
        }
    } else {
        res.status(200).json({})
    }
}
