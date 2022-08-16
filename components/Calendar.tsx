import Form from "react-bootstrap/Form";
import { useState } from "react";
import Week from "./Week";
import { Button } from "react-bootstrap";
import { IHourData } from "./Day";
import axios from "axios";

interface IDaysData {
  [key: string]: IHourData;
}

const Calendar: React.FC = () => {
  const [weeks, setWeeks] = useState([0]);
  const [datasetName, setDatasetName] = useState('');
  const [daysData, setDaysData] = useState<IDaysData>({});

  const setDays = (newHours: IHourData, day: Date) => {
    const month = day.getUTCMonth() + 1;
    const date = day.getUTCDate();
    const year = day.getUTCFullYear();
    const newdate = year + "-" + month + "-" + date;
    setDaysData({ ...daysData, [newdate]: newHours });
  };

  const setWeeksArr = (weekAmount: number) => {
    let weeksAsArr: number[] = [];
    for (let i = 0; i < weekAmount; i++) {
      weeksAsArr.push(i);
    }
    setWeeks(weeksAsArr);
  };

  const saveDaysData = (dataOfDays: IDaysData, nameOfDataSet: string) => {
    if(datasetName){
      axios
      .post("/api/saveDaysData", {
        daysData: dataOfDays,
        datasetName: nameOfDataSet
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      alert("fill out name");
    }
  };

  return (
    <div>

      <Form.Select onChange={(e) => setWeeksArr(parseInt(e.target.value))}>
        <option value="0">how many weeks</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
        <option value="5">Five</option>
      </Form.Select>
      <Form.Group className="mb-3" controlId="formDataName">
        <Form.Label>Name your dataset</Form.Label>
        <Form.Control onChange={(e) => setDatasetName(e.target.value)} type="text" placeholder="Enter dataset name" />
      </Form.Group>
      <div>
        {weeks.map((el) => {
          return <Week setDays={setDays} key={el} weekNum={el} />;
        })}
      </div>
      <Button onClick={() => saveDaysData(daysData, datasetName)} variant="primary">
        Save
      </Button>
    </div>
  );
};

export default Calendar;
