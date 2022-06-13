import style from "./Form.module.css";
import { useRef } from "react";

export default function Form({ events, updateFilter }) {
  
  const yearInp = useRef();
  const monthInp = useRef();
  
  const allMonths = {
    "00": "January",
    "01": "February",
    "02": "March",
    "03": "April",
    "04": "May",
    "05": "June",
    "06": "July",
    "07": "August",
    "08": "September",
    "09": "October",
    "10": "November",
    "11": "December",
  };

  let availableMonths = [
    ...new Set(events.map((event) => event.date.split("-")[1])),
  ];
  let availableYears = [
    ...new Set(events.map((event) => event.date.split("-")[0])),
  ];

  const filter = (e) => {
    e.preventDefault();
    updateFilter({year: yearInp.current.value, month: monthInp.current.value});
  }

  return (
    <form
      className={`${style.form} flex-row`}
      onSubmit={filter}
    >
      <div className="flex-row">
        <label htmlFor="year">Year</label>
        <select id="year" ref={yearInp}>
          <option value="default">--</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-row">
        <label htmlFor="month">Month</label>
        <select id="month" ref={monthInp}>
          <option value="default">--</option>
          {availableMonths.map((month) => (
            <option key={month} value={month}>
              {allMonths[month]}
            </option>
          ))}
        </select>
      </div>
      <button>Find Events</button>
    </form>
  );
}
