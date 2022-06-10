import { PrismaClient, Workout, WorkoutLine } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { WorkoutInfo } from 'types/index';

const prisma = new PrismaClient();

type Response = { msg: string };

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<WorkoutInfo | Response>
) {
  if (req.method === 'GET') {
    const { todaysWorkoutId } = req.query;

    const workout = await prisma.workout.findFirst({
      where: { id: todaysWorkoutId as string },
      include: { exercises: { include: { exercise: true } } }
    });
    if (!workout) {
      res.status(400).json({ msg: 'no workout found' });
    } else {
      res.status(200).json({ workout: workout });
    }
  }
}
