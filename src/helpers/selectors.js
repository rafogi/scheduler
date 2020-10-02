export function getAppointmentsForDay(state, day) {
  if (!state.days.length){
    return [];
  }
  let exists = 0;
  for (const days of state.days) {
    if(days.name === day){ 
      exists +=1;
    };
  }

  if (!exists) {
    return [];
  }

  const filteredDays = state.days.filter(dayList => dayList.name === day)[0].appointments
  .map((app) => state.appointments[app])
    return filteredDays;
}

export function getInterview(state, interview) {
  //console.log('state', state)
  if (!interview){
    return null
  } 
  const id = interview.interviewer;
  
  const intervObj = state.interviewers;
  let keys = Object.keys(state.interviewers);
  let newOb = {}
  let num = null;
  for (const inter of keys) {
    num = Number(inter);
    if (num === id) {
      newOb.student = interview.student;
      newOb.interviewer=intervObj[inter];
    }
  }
  console.log(newOb)
  return newOb;
}

export function getInterviewersForDay (state, day) {
  let daysArray = state.days;
  if (!daysArray.length){
    return [];
  }
  let exists = 0;
  for (const days of state.days) {
    if(days.name === day){ 
      exists +=1;
    };
  }

  if (!exists) {
    return [];
  }

  const filteredDays = daysArray.filter(dayList => dayList.name === day)[0].interviewers
  .map((interviewer) => state.interviewers[interviewer])

  return filteredDays;
}


const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers:[1,2]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers:[1]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },

  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};

getInterviewersForDay(state, "Monday");