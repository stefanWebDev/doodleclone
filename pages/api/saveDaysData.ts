// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { IDaysData } from "../../components/Calendar";

interface IReceivedData {
  daysData: IDaysData;
  datasetName: string;
}

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
  for (let date in daysData) {
    const dayFields = await prisma.dayField.findMany({
      where: {
        dateId: {
          equals: date,
        },
      },
    }); 
    if(dayFields) {
      for (let dayField of dayFields) {
        await prisma.dayField.update({
          where: {
            id: dayField.id,
          },
          data: {
            //@ts-ignore
            isSelected: daysData[date][dayField.name].isSelected as boolean,
          },
        })
      }
    } else {

    }
  }
}
