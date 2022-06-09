import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-multi-date-picker";

export const Example:React.FC = () => {
  const [value, setValue] = useState<string[]>([]);
  useEffect(() => {
    const workOutData = async () => {
      const res = await axios.get("/api/workouthistory");
      const data = await res.data.data;
      const dates = Object.keys(data).map((date) => {
        return moment(date).format("YYYY-M-D");
      });
      setValue(dates);
      console.log(dates);
    };
    workOutData();
  }, []);

  console.log("value", value);

  return <Calendar readOnly={true} value={value} onChange={() => {}} />;
}
