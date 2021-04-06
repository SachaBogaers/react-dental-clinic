import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Home";
import Calendar from "./Calendar";
import Day from "./Day";

import { generateRandomAppointments, generateRandomAppointment, getRandomEmployee, getRandomPatient, sortAppointments } from "./utils";


const numberOfDentists = 4;
const numberOfAssistants = 2;
const numberOfAppointments = 150;
const numberOfPatients = 50;

const App = () => {
  // Setting initial state
  // Appointing dentists
  const appointDentists = () => {
    const newDentists = []
    for (let i = 1; i <= numberOfDentists; i++) newDentists.push(getRandomEmployee(i))
    return newDentists
  }
  const [dentists, setDentists] = useState(appointDentists())

  // Appointing assistants
  const appointAssistants = () => {
    const newAssistants = []
    for (let i = 1; i <= numberOfAssistants; i++) newAssistants.push(getRandomEmployee(i))
    return newAssistants
  }
  const [assistants, setAssistants] = useState(appointAssistants())

  // Generating a random set of patients
  const generatePatients = () => {
    const newPatients = []
    for (let i = 1; i <= numberOfPatients; i++) newPatients.push(getRandomPatient(i))
    return newPatients
  }
  const [patients, setPatients] = useState(generatePatients())

  // Generating a random set of appointments
  const generatedAppointments = generateRandomAppointments(numberOfAppointments, dentists, assistants, patients)
  const sortedAppointments = sortAppointments(generatedAppointments)
  const [appointments, setAppointments] = useState(sortedAppointments);

  const makeDentistSick = (dentistId) => {
    const copyAppointments = [...appointments]
    const newAppointments = []
    copyAppointments.forEach(function (appointment) {
      if (appointment.dentist.id === dentistId) {
        appointment.cancelled = true;
      }
      newAppointments.push(appointment)
    })
    return newAppointments;
  }

  const makePatientSick = (patientId) => {
    const copyAppointments = [...appointments]
    const newAppointments = []
    copyAppointments.forEach(function (appointment) {
      if (appointment.patient.id !== patientId) {
        newAppointments.push(appointment)
      }
    })
    return newAppointments;
  }

  const removeAppointment = (appointmentId) => {
    const newAppointments = [...appointments].filter(appointment => {
      return appointment.id !== appointmentId
    })
    return newAppointments
  }



  const moveAppointment = (appointmentId, newDayNumber, newTime) => {
    const appointment = [...appointments].filter(appointment => appointment.id === appointmentId)[0]
    console.log("appointment to be moved", appointment)
    const newAppointments = [...appointments].filter(appointment => {
      return appointment.id !== appointmentId
    })
    const daysAppointments = newAppointments.filter(appointment => appointment.day === newDayNumber)
    if (daysAppointments.length > 0) {
      const timeAppointments = daysAppointments.filter(e => e.time === newTime)
      const conflictingAppointmentDentist = timeAppointments.filter(e => e.dentist === appointment.dentist)
      if (conflictingAppointmentDentist.length > 0) {
        console.log("Dentist already has an appointment at that time!")
        return [...appointments]
      }
      if (appointment.assistant) {
        const conflictingAppointmentAssistant = timeAppointments.filter(e => e.assistant === appointment.assistant)
        if (conflictingAppointmentAssistant.length > 0) {
          console.log("Assistant already has an appointment at that time!")
          return [...appointments]
        }
      }
    }
    const newAppointment = {
      day: newDayNumber,
      time: newTime,
      patient: appointment.patient,
      dentist: appointment.dentist,
      id: appointmentId
    }
    if (appointment.assistant) {
      newAppointment.assistant = appointment.assistant
    }
    newAppointments.push(newAppointment)
  }
  moveAppointment(40, 2, 12)


  useEffect(() => {
    const newAppointments = makeDentistSick(3);
    setAppointments(newAppointments)
  }, [])

  useEffect(() => {
    const newAppointments = makePatientSick(30);
    setAppointments(newAppointments)
  }, [])

  useEffect(() => {
    const newAppointments = removeAppointment(4);
    setAppointments(newAppointments)
  }, [])

  // useEffect(() => {
  //   const newAppointments = moveAppointment(40, 13, 15)
  //   console.log(newAppointments)
  // })


  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar view</Link>
            </li>
            <li>
              <Link to="/day">Day view</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Switch>
            <Route path="/calendar">
              <Calendar appointments={appointments} />
            </Route>
            <Route path="/day">
              <Day appointments={appointments.filter(app => app.day === 1)} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>)
};

export default App;
