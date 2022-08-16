import type { NextPage } from "next";
import Calendar from "../components/Calendar";
import { Provider } from "react-redux";

const Home: NextPage = () => {
  return (
      <div>
        <Calendar />
      </div>
  );
};

export default Home;
