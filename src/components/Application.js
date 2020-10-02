

import DayList from './DayList'
import React, { useState, useEffect } from "react";
import Appointment from 'components/Appointment/index'
import axios from 'axios'
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"
import useApplicationData from 'hooks/useApplicationData';

import "components/Application.scss";



export default function Application(props) {

const {state, setDay,bookInterview,cancelInterview} = useApplicationData()

const dailyAppointments = getAppointmentsForDay(state, state.day);
  

const appointmentList = dailyAppointments.map(appointment => {
  const DailyInterviews = getInterviewersForDay(state, state.day);
  const interv = getInterview(state, appointment.interview)
  return (<Appointment
  key = { appointment.id }
  {...appointment}
  interview = { interv }
  interviewers = { DailyInterviews }
  bookInterview = { bookInterview }
  cancelInterview = {cancelInterview}
/>)
})

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
      {appointmentList}
      <Appointment key="last" time="5pm" />
    </section>
  </main>
);
}

