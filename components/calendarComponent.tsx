// import {useState} from "react";
// import DatePicker from "react-multi-date-picker";

// function calendarComponent() {
//   const [value, setValue] = useState(['2022-6-8','2022-6-9','2022-6-10'])

//   function handleChange(value){
//     console.log(value)
//   }
  

//   return (
//     <div>
//       <DatePicker value={value}   onChange={handleChange}  />
//     </div>
//   );
// }

// export default calendarComponent;

import React, { useState } from "react"
import { Calendar } from "react-multi-date-picker"

export default function Example() {
  const [value, setValue] = useState(['2022-6-8','2022-6-9','2022-6-10'])


  return (
    <Calendar 
      value={value}
      disabled
      
    />
  )
}
