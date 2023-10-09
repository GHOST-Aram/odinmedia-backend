import { 
    get_login_form, 
    get_sign_up_form,
    creat_user 
} from "../controllers/auth.js";
import { Router } from "../zghost/app/init.js";
import passport from 'passport'

const authRouter = Router()

authRouter.get('/facebook', passport.authenticate('facebook'))
authRouter.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: 'auth/login'
}))
authRouter.get('/login',get_login_form )
authRouter.get('/sign-up', get_sign_up_form)
authRouter.post('/sign-up', creat_user)

export {authRouter}