import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'GET') {

    const workouts = await prisma.workout.findMany({
      include: { exercises: true },
    })

    if (workouts.length == 0) {
      res.status(400).json({ msg: 'no workouts' })
    }
    res.status(200).json(workouts)
  } 
}
