import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import Header from '@/components/Header'

const prisma = new PrismaClient()

export default async function TrainingPage() {
  const trainingSessions = await prisma.training.findMany()
  const session = await getAuthSession()
  console.log('Training sessions:', trainingSessions)
  console.log('Session:', session)

  if (!session) {
    redirect('/')
  }

  return (
    <main>
      <Header />
      <h1>Find your favorite activity</h1>
      <ul id='training-sessions'>
        {trainingSessions.map(training => (
          <li key={training.id}>
            <img
              src={`/trainings/${training.image}`}
              alt={training.title}
            />
            <div>
              <h2>{training.title}</h2>
              <p>{training.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
