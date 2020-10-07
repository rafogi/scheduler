import React from "react";
import classnames from 'classnames';
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classnames ('day-list__item', {
    'day-list__item--selected':props.selected,
    'day-list__item--full': !props.spots,
  })

  const formatSpots = (props) => {
    let remaining = props.spots
    if (remaining === 0) {
      return 'no spots remaining'
    }

    if(remaining === 1) {
      return '1 spot remaining'
    }
    return remaining + " spots remaining"
  }

  return (
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name) }>
      <h3>{props.name}</h3>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}