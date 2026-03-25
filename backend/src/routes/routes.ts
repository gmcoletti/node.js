import { Router } from 'express'
import { homeController } from '../controllers/home.controller'
import { helloController } from '../controllers/hello.controller'
import { submitUserFormController } from '../controllers/user-form.controller'

const router = Router()

router.get('/home', homeController)
router.get('/hello', helloController)
router.post('/user-form', submitUserFormController)

export default router
