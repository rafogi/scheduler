

import DayList from './DayList'
import React, { useState, useEffect } from "react";
import Appointment from 'components/Appointment/index'
import axios from 'axios'
import getAppointmentsForDay from "helpers/selectors"

import "components/Application.scss";



export default function Application(props) {

  // const [day, setDay] = useState(["Monday"]);
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state,state.day);


  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));


  useEffect(() => {
    const daysURL = `http://localhost:5000/api/days`;
    const appointmentsURL = 'http://localhost:5000/api/appointments'
    
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}))
    })
    // axios.get(daysURL).then(response => {
    //   setDays([...response.data])
    // });
  }, [])


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => {
          return (
            <Appointment
              key={appointment.id} {...appointment}
            />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

