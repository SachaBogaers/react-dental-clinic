import React from "react";
import "./Day.css";
import AppointmentInDay from "./AppointmentInDay";

export default ({ appointments }) => {
  const appointmentsJSX = appointments.map(
    ({ time, patient, dentist, assistant, cancelled }, index) => (
      <AppointmentInDay
        time={time}
        patient={patient.name}
        dentist={dentist.name}
        assistant={assistant}
        cancelled={cancelled}
        key={index}
      />
    )
  );
  return <ul className="dayview">{appointmentsJSX}</ul>;
};
