import { prisma } from '../../config/prismaClient'

export class ClientService {
  async getAll() {
    // Busca todos os clientes ordenados pelos mais recentes
    const clients = await prisma.client.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return clients
  }

  async create(data: { name: string; phone: string; email?: string }) {
    const newClient = await prisma.client.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email
      }
    })
    return newClient
  }
  async delete(id: number) {
    await prisma.client.delete({
      where: { id }
    })
  }
}