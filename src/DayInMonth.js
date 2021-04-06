import React from "react";
import AppointmentInMonth from "./AppointmentInMonth";

export default ({ appointments }) => {
  const appointmentsJSX = appointments.map(({ day, time, patient, dentist, assistant, cancelled }, index) => (
    <AppointmentInMonth time={time} patient={patient} dentist={dentist} assistant={assistant} cancelled={cancelled} key={index} />
  ));
  return <div className="day">{appointmentsJSX}</div>;
};
