
import { prisma } from '../../config/prismaClient'
import { Status } from '@prisma/client'
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

  async create(data: {
    device: string;
    description: string;
    clientId: number;
    status: Status;
  }) {
    const newOrder = await prisma.serviceOrder.create({
      data: {
        device: data.device,
        description: data.description,
        clientId: data.clientId,
        status: data.status
      }
    })

    return newOrder
  }

  async delete(id: number) {
    await prisma.serviceOrder.delete({
      where: { id }
    })
  }

  async update(id: number) {
    const order = await prisma.serviceOrder.findUnique({
      where: { id }
    })

    if (!order) {
      return undefined
    }

    let nextStatus: Status

    switch (order.status) {
      case Status.OPEN:
        nextStatus = Status.IN_PROGRESS
        break

      case Status.IN_PROGRESS:
        nextStatus = Status.CLOSED
        break

      case Status.CLOSED:
        return order
    }

    return await prisma.serviceOrder.update({
      where: { id },
      data: {
        status: nextStatus
      }
    })
  }
}