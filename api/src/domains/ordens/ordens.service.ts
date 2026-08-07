
import { prisma } from '../../config/prismaClient'

export class ServiceOrderService {
  async getAll() {
    const orders = await prisma.serviceOrder.findMany({
      include: {
        client: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return orders
  }

  async create(data: { device: string; description: string; clientId: number }) {
    const newOrder = await prisma.serviceOrder.create({
      data: {
        device: data.device,
        description: data.description,
        clientId: data.clientId
      }
    })
    return newOrder
  }

  async delete(id: number) {
    await prisma.serviceOrder.delete({
      where: { id }
    })
  }
}
