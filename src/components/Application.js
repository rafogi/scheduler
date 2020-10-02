

import DayList from './DayList'
import React, { useState, useEffect } from "react";
import Appointment from 'components/Appointment/index'
import axios from 'axios'
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors"


import "components/Application.scss";



export default function Application(props) {



  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state,state.day);
  const DailyInterviews = getInterviewersForDay(state,state.day);



  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));


  useEffect(() => {
    const daysURL = `http://localhost:5000/api/days`;
    const appointmentsURL = 'http://localhost:5000/api/appointments'
    const interviewersURL = 'http://localhost:5000/api/interviewers'
    
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers:all[2].data}))

    })

  }, [])

  function bookInterview(id, interview) {
    console.log(id, interview);
  }


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
              key={appointment.id} {...appointment} interviewers={DailyInterviews} bookInterview={bookInterview}
            />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

