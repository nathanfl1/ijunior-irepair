import { Request, Response } from 'express'
import { ClientService } from './clients.service'

const clientService = new ClientService()

export class ClientController {
  async index(req: Request, res: Response) {
    try {
      const clients = await clientService.getAll()
      return res.status(200).json(clients)
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar clientes' })
    }
  }

  async create(req: Request, res: Response) {
    const { name, phone, email } = req.body

    // Validação básica
    if (!name || !phone) {
      return res.status(400).json({ error: 'Nome e telefone são obrigatórios' })
    }

    try {
      const client = await clientService.create({ name, phone, email })
      return res.status(201).json(client)
    } catch (error) {

      return res.status(500).json({ error: 'Erro ao criar cliente' })
    }
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      await clientService.delete(Number(id))
      return res.status(200).json({ message: 'Cliente deletado com sucesso' })
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar cliente' })
    }
  }
}