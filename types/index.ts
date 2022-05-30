import { Excercise } from "@prisma/client";
import { Collection } from "lodash";

export type ProgressAPIResponseType = Collection<{
    name: string;
    exercise: Excercise;
    max: number;
    data: number[];
    labels: Date[];
  }>;
  