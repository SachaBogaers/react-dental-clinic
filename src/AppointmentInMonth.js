import React from "react";

const format_time = time => (time < 10 ? `0${time}:00u` : `${time}:00u`);

export default ({ day, time, patient, assistant, dentist, cancelled }) => (
  <div className={`appointment ${cancelled ? "cancelled" : ""}`}>

    <span className="time">{format_time(time)}</span><br></br>
    <span className="patient">Patient: {patient.name}</span><br></br>
    <span className="dentist">Dentist: {dentist.name}</span><br></br>
    {assistant && <span className="assistant">Assistant: {assistant.name}</span>}<br></br>
    {cancelled && <span className="illDentist">Dentist is ill!</span>}
  </div>
);
