import React from "react";
import DayListItem from './DayListItem';

export default function DayList(props){



  const DayLists = props.days.map((day) => {
    return <DayListItem
    name={day.name}
    key={day.id} 
    selected={day.name === props.day}
    spots={day.spots}
    setDay={props.setDay}/>
  })

  return(
    <ul>
      {DayLists}

    </ul>
  )
}