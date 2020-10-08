import  {  useEffect, useReducer } from "react";
import axios from 'axios';

export default function useApplicationData() {
//declare initial state for reducer
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  };

  //get the count for spots remaining for current day selected
  const changeSpots = (day, appointments) => {

    let count = 0;
    const appointmentsForDay = day.appointments;
    for (const app of appointmentsForDay) {
      if(!appointments[app].interview) {
        count += 1;
      }
    }
    return count
  };
//update the spots for all days in appointments
  const addSpotsToDays   = (days, appointments) => {
    const updatedDays = days.map(day => ({
      ...day,
      spots: changeSpots(day, appointments)
     }))
     return updatedDays
  }

//declare action type variables
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const [state, dispatch] = useReducer(reducer, initialState);
//reducer function to change the day application data and appointments
  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers
        };
      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };
        
        const days = addSpotsToDays(state.days, appointments)
        return {
          ...state,
          appointments :appointments,
          days: days
        }

      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }
//grab data from api/db
  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = '/api/appointments'
    const interviewersURL = '/api/interviewers'

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ])
    .then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, []);
//function for booking/edit interview
  const bookInterview = function (id, interview) {
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => ( dispatch({ type: SET_INTERVIEW, id, interview: interview})))
  }
//function for removing an interview booked
  const cancelInterview = function (id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => ( dispatch({ type: SET_INTERVIEW, id, interview: null})))
  }

  const setDay = day => dispatch({ type: SET_DAY, day });

  return { state, setDay, bookInterview, cancelInterview }
}