// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { DayField, PrismaClient } from "@prisma/client";
import { IDaysData } from "../../components/Calendar";

interface IReceivedData {
  daysData: IDaysData;
  datasetName: string;
}

type tills =
  | "till8"
  | "till10"
  | "till12"
  | "till14"
  | "till16"
  | "till18"
  | "till20"
  | "till22";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IReceivedData>
) {
  if (req.method === "POST") {
    try {
      console.log(req.body);
      //   saveUser(req.body);
    } catch (err) {
      console.log(err);
    }
  }
}

async function saveDateData(dateData: IReceivedData) {
  const prisma: PrismaClient = new PrismaClient();
  upsertDataSetName(prisma, dateData.datasetName);
  upsertDates(prisma, dateData);
}

async function upsertDataSetName(prisma: PrismaClient, dataSetName: string) {
  await prisma.dataSetName.upsert({
    where: {
      id: dataSetName,
    },
    update: {
      id: dataSetName,
      nameIsId: dataSetName,
    },
    create: {
      id: dataSetName,
      nameIsId: dataSetName,
    },
  });
}

async function upsertDates(prisma: PrismaClient, receivedData: IReceivedData) {
  for (let date in receivedData.daysData) {
    await prisma.date.upsert({
      where: {
        id: date,
      },
      update: {
        id: date,
        dateIsId: date,
      },
      create: {
        id: date,
        dateIsId: date,
        dataSetId: receivedData.datasetName,
      },
    });
  }
}

async function upsertDayFields(prisma: PrismaClient, daysData: IDaysData) {
  //refactor, split in different functions
  for (let date in daysData) {
    const dayFields: void | DayField[] = await prisma.dayField
      .findMany({
        where: {
          dateId: {
            equals: date,
          },
        },
      })
      .then(async (dayFields: DayField[]) => {
        if (dayFields) {
          for (let dayField of dayFields) {
            await prisma.dayField.update({
              where: {
                id: dayField.id,
              },
              data: {
                isSelected: daysData[date][dayField.name as tills],
              },
            });
          }
        } else {
          let x = daysData[date].till12;

          // for (let dayField of daysData[date])  {

          // }
          // const user = await prisma.dayField.create({
          //   data: {
          //     dateId: date,
          //     name: dayField,
          //   },
          // })
        }
      });
  }
}
