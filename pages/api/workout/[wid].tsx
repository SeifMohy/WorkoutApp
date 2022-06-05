import { PrismaClient } from '@prisma/client'

// Fetch all posts (in /pages/api/posts.ts)
const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === 'GET') {

    const { wid } = req.query

    const workout = await prisma.workout.findFirst({

      where: { id: +wid },
      include: { exercises: {include:{ exercise: true } },
    }})
    if (!workout) {
      res.status(400).json({ msg: 'no workout found' })
    }


    res.status(200).json(workout)
  } else if (req.method === 'POST') {
    try {
      const { name, imgUrl } = req.body
      const workout = await prisma.workout.create({
        data: {
          name,
          imgUrl,
        },
      })
      res.status(200).json({ msg: 'workout created', workout })
    } catch (err) {
      res.status(400).json({ msg: 'something went wrong', details: err })
    }
  }
}
