
import classnames from 'classnames';
import DayList from './DayList'
import React, { useState, useEffect  } from "react";
import Appointment from 'components/Appointment/index'
import axios from 'axios'

import "components/Application.scss";






const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "12pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  },
  {
    id: 4,
    time: "4pm",
  },
  {
    id: 5,
    time: "3pm",
    interview: {
      student: "Sven Jones",
      interviewer: {
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg"
      }
    }
  },
];

export default function Application(props) {

  const [day, setDay] = useState(["Monday"]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const testURL = `http://localhost:5000/api/days`;
    axios.get(testURL).then(response => {
      setDays([...response.data])
    });
  },[days])


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
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {appointments.map(appointment => {
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

