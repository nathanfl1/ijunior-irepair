import { Request, Response } from 'express'
import { ServiceOrderService } from './ordens.service'
import { Status } from '@prisma/client'

const serviceOrderService = new ServiceOrderService()

export class ServiceOrderController {
  async index(req: Request, res: Response) {
    try {
      const orders = await serviceOrderService.getAll()
      return res.status(200).json(orders)
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar ordens de serviço' })
    }
  }

  async create(req: Request, res: Response) {
    const { device, description, clientId, status } = req.body

    try {
      const order = await serviceOrderService.create({ device, description, clientId, status: status as Status })
      return res.status(201).json(order)
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar ordem de serviço' })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    try {
      await serviceOrderService.delete(Number(id))
      return res.status(200).json({ message: 'Ordem deletada com sucesso' })
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar ordem de serviço' })
    }
  }
  async update(req: Request, res: Response) {
        const id = Number(req.params.id);

        const order = await serviceOrderService.update(id);

        if (!order) {
            return res.status(404).json({
                message: "Ordem de serviço não encontrada"
            });
        }

        return res.status(200).json(order);
    }
}