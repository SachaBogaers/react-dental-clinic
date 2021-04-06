import React from "react";

const format_time = time => (time < 10 ? `0${time}:00u` : `${time}:00u`);

export default ({ time, patient, dentist, assistant, cancelled }) => (
  <li className={`appointment ${cancelled ? "cancelled" : ""}`}>
    <div className="time">{format_time(time)}</div>
    <div className="patient">Patient: {patient}</div>
    <div className="dentist">Dentist: {dentist}</div>
    {assistant && <div className="assistant">Assistant: {assistant.name}</div>}
    {cancelled && <div className="illDentist">Dentist is ill!</div>}
  </li>
);
