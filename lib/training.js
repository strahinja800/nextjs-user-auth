import prisma from '@/prisma/client'

export async function getTrainings() {
  return await prisma.training.findMany()
}
