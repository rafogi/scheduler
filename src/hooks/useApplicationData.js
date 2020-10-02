import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useVisualMode(initial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = '/api/appointments'
    const interviewersURL = '/api/interviewers'
  
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
  
    })
  
  }, [])

  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => (setState({ ...state, appointments })))
  }

  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(appointment);
    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => (setState({ ...state, appointments })))
  }

  const setDay = day => setState({ ...state, day });

  return{state, setDay, bookInterview, cancelInterview}
}