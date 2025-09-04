import prisma from '@/prisma/client'
import { hashUserPassword } from './hash'

export async function createUser(email, password) {
  const hashedPassword = hashUserPassword(password)
  const prismaCreate = await prisma.user.create({
    data: { email, password: hashedPassword },
  })

  return prismaCreate
}
