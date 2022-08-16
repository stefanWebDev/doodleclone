import { useState } from "react";
import Form from "react-bootstrap/Form";

interface IDay {
  date: Date;
  setDays(hourData: IHourData, day: Date): void
}

export interface IHourData {
  till8: boolean;
  till10: boolean;
  till12: boolean;
  till14: boolean;
  till16: boolean;
  till18: boolean;
  till20: boolean;
  till22: boolean;
}

const Day: React.FC<IDay> = ({ date, setDays }: IDay) => {
  const starterHourData: IHourData = {
    till8: false,
    till10: false,
    till12: false,
    till14: false,
    till16: false,
    till18: false,
    till20: false,
    till22: false,
  };

  const [hourData, setHourData] = useState<IHourData>(starterHourData);

  const updateDayData = (newHourData: IHourData) => {
    setHourData(newHourData);
    setDays(newHourData, date);
  }


  const weekdays: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const isDayDisabled = (): boolean => {
    const dateIsDisabled: boolean = date <= new Date();
    return dateIsDisabled;
  };
  const formIsDisabled: boolean = isDayDisabled();

  return (
    <div>
      {weekdays[date.getDay()]}, {date.getUTCDate()}.{date.getUTCMonth() + 1}.
      {date.getUTCFullYear()}
      <Form.Check
        disabled={formIsDisabled}
        onChange={() => updateDayData({ ...hourData, till8: !hourData.till8 })}
        label={`6:00-8:00`}
      />
      <Form.Check
        disabled={formIsDisabled}
        onChange={() => updateDayData({ ...hourData, till10: !hourData.till10 })}
        label={`8:00-10:00`}
      />
      <Form.Check
        disabled={formIsDisabled}
        onChange={() => updateDayData({ ...hourData, till12: !hourData.till12 })}
        label={`10:00-12:00`}
      />
      <Form.Check
        disabled={formIsDisabled}
        onChange={() => updateDayData({ ...hourData, till14: !hourData.till14 })}
        label={`12:00-14:00`}
      />
      <Form.Check
        disabled={formIsDisabled}
        onChange={() => updateDayData({ ...hourData, till16: !hourData.till16 })}
        label={`14:00-16:00`}
      />
      <Form.Check
        disabled={formIsDisabled}
        onChange={() => updateDayData({ ...hourData, till18: !hourData.till18 })}
        label={`16:00-18:00`}
      />
      <Form.Check
        disabled={formIsDisabled}
        onChange={() => updateDayData({ ...hourData, till20: !hourData.till20 })}
        label={`18:00-20:00`}
      />
      <Form.Check
        disabled={formIsDisabled}
        onChange={() => updateDayData({ ...hourData, till22: !hourData.till22 })}
        label={`20:00-22:00`}
      />
    </div>
  );
};

export default Day;
