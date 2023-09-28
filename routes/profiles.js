import { get_my_profile } from "../controllers/profiles.js";
import { Router } from "../zghost/app/init.js";

const profilesRouter = Router()

profilesRouter.get('/:id', get_my_profile)

export {profilesRouter}