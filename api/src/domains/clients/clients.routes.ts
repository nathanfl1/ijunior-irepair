import { Router } from 'express'
import { ClientController } from './clients.controller'
import { authMiddleware } from '../../middlewares/authMiddleware'

const clientRoutes = Router()
const clientController = new ClientController()

// Protegendo as rotas de clientes
clientRoutes.use(authMiddleware)

clientRoutes.get('/', clientController.index.bind(clientController))
clientRoutes.post('/', clientController.create.bind(clientController))
clientRoutes.delete('/:id', clientController.delete.bind(clientController))
export { clientRoutes }