import { addDays } from "date-fns";
import Day, { IHourData } from "./Day";

interface IWeek {
  weekNum: number;
  setDays(hourData:IHourData, day: Date): void;
}

const Week: React.FC<IWeek> = ({ weekNum, setDays }: IWeek) => {
  const getDays = (weekNum: number): Date[] => {
    const monday: Date = getMonday(weekNum);
    const tuesday: Date = addDays(monday, 1);
    const wednesday: Date = addDays(monday, 2);
    const thursday: Date = addDays(monday, 3);
    const friday: Date = addDays(monday, 4);
    const saturday: Date = addDays(monday, 5);
    const sunday: Date = addDays(monday, 6);
    const days = [
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    ];
    return days;
  };

  const getMonday = (weekNum: number): Date => {
    const prevMonday = new Date();
    prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7));
    prevMonday.setDate(prevMonday.getDate() + weekNum * 7);
    return prevMonday;
  };

  const days: Date[] = getDays(weekNum);

  return (
    <div>
      <h3>Week {weekNum + 1}</h3>
      {days.map((date: Date, i: number) => {
        return (
          <div key={i}>
            <Day setDays={setDays} date={date} />
          </div>
        );
      })}
    </div>
  );
};

export default Week;
