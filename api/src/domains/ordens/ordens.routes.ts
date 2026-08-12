import { Router } from 'express'
import { ServiceOrderController } from './ordens.controller'
import { authMiddleware } from '../../middlewares/authMiddleware'

const serviceOrderRoutes = Router()
const serviceOrderController = new ServiceOrderController()

serviceOrderRoutes.use(authMiddleware)

serviceOrderRoutes.get('/', serviceOrderController.index.bind(serviceOrderController))
serviceOrderRoutes.post('/', serviceOrderController.create.bind(serviceOrderController))
serviceOrderRoutes.delete('/:id', serviceOrderController.delete.bind(serviceOrderController))
serviceOrderRoutes.put('/:id', serviceOrderController.update.bind(serviceOrderController))
export { serviceOrderRoutes }