import React from "react";
import classnames from 'classnames';
import DayListItem from './DayListItem';

export default function DayList(props){

  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];

  const DayLists = days.map((day, index) => {
    return <DayListItem 
    name={day.name}  
    selected={day.name === props.day}
    spots={day.spots}
    setDay={props.setDay}   />
  })

  return(
    <ul>
      {DayLists}

    </ul>
  )
}