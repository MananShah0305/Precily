import express from 'express'
import { getBoxInfo,getBoxInfoFrontEnd,addBoxInfo,editBoxInfo} from './boxController.js'

const router = express.Router()

router.route('/').get(getBoxInfoFrontEnd)

router.route('/').post(addBoxInfo)

router.route('/:id').patch(editBoxInfo)

export default router

