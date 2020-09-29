import React from "react";
import classnames from 'classnames';
import DayListItem from './DayListItem';

export default function DayList(props){



  const DayLists = props.days.map((day) => {
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