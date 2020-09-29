import React from "react";
import classnames from 'classnames';
import "components/InterviewerListItem.scss";

// id:number - the id of the interviewer
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer
// selected:boolean - to determine if an interview is selected or not
// setInterviewer:function - sets the interviewer upon selection

export default function InterviewerListItem(props) {
  const interviewerClass = classnames ('interviewers__item', {
    'interviewers__item--selected':props.selected
  })


  return (
    <li className={interviewerClass} onClick={() => props.setInterviewer(props.name)}>
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      {props.name}
    </li>
  );



}