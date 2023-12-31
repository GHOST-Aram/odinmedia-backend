import { app, Authenticator } from './init.js';
import * as strategies from '../utils/auth-strategies.js';
import { authentication_session } from '../utils/session.js';
import * as cookies from '../utils/cookies.js';
import 'dotenv/config.js'

app.use(authentication_session())

try {
    Authenticator.use(strategies.oAuth('facebook'))
    Authenticator.use(strategies.oAuth('google'))
    Authenticator.use(strategies.oAuth('github'))
} catch (error) {
    console.log(error)
}
Authenticator.use(strategies.localStrategy)

app.use(Authenticator.initialize())
app.use(Authenticator.session())

Authenticator.serializeUser(cookies.create_cookie)
Authenticator.deserializeUser(cookies.decode_cookie)

export {app}


