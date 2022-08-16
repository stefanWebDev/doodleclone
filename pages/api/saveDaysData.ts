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


    // await prisma.dataSetName.upsert({
    //   where: {
    //     id: dateData.datasetName
    //   },
    //   update: {
    //     name: 'Viola the Magnificent',
    //   },
    //   create: {
    //     email: 'viola@prisma.io',
    //     name: 'Viola the Magnificent',
    //   },
    // })
}


function processDataForStorage(data: IDaysData) {
  let processedData = [];
  for (const dataSet in data) {
      const obj = {date: dataSet};
      const createTimesArray = [];
      for (const time in data[dataSet]) {
          
      }
  }

}