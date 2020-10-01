export default function getAppointmentsForDay(state, day) {
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
