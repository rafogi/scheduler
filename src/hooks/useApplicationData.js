import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  const changeSpots = (days, day, operator) => {
    for (const name of days) {
      if(name.name === day && operator === "plus") {
        name.spots = name.spots + 1
      }
      if(name.name === day && operator === "minus") {
        name.spots = name.spots - 1
      }
    }
  };



  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = '/api/appointments'
    const interviewersURL = '/api/interviewers'
  
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      console.log(all[0].data[0].spots)
      setState(prev => (

         {...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
      
    })
  
  }, [])

  const bookInterview = function(id, interview) {
    if(state.appointments[id].interview === null) {
      changeSpots(state.days, state.day, "minus");
    }
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
    changeSpots(state.days, state.day, "plus");

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => (setState({ ...state, appointments })))
  }

  const setDay = day => setState({ ...state, day });

  return{state, setDay, bookInterview, cancelInterview}
}