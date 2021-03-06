import type { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import { WorkoutHistoryCard } from 'types/index';
import prisma from 'prismaClient';
import { getUser } from "@supabase/supabase-auth-helpers/nextjs";

type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WorkoutHistoryCard | Error>
) {
  const { user } = await getUser({ req, res });

  if (!user) {
    res.status(400);
  } else {
    const userId = user.id;
    const userLogs = await prisma.userLog.findMany({
      where: { userId: userId},
      include: { workoutLine: { include: { exercise: true, workout: true } } }
    });

    const sortedUserLogs = userLogs.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    //console.log(sortedUserLogs);

    const logsGroupedByDate = _(sortedUserLogs)
      .groupBy((log) => log.date)
      .entries();

    //console.log(groupedData);

    const logsForTheSession = logsGroupedByDate.map((logArr) => logArr[1]);

    const calendarData = {
      workoutDates: logsGroupedByDate.map((x) => x[0]),
      workouts: logsForTheSession.map((sessionLog,idx) => {
        return {
          date: sessionLog[0].date,
          workoutName: sessionLog[0].workoutLine.workout.name,
          workoutLines: _(sessionLog)
            .groupBy((sessionLog) => sessionLog.workoutLine.id)
            .entries()
            .map(workoutLine=>{
              return {
                exercise: workoutLine[1][0].workoutLine.exercise,
                logs: workoutLine[1]
              }
            })
        };
      })
    };

    res.status(200).json(calendarData);
  }
}
