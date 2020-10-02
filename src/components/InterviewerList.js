import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {



  const InterViewerList = props.interviewers.map((interviewer) =>  {
    return <InterviewerListItem
    key = {interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id===props.interviewer}
    setInterviewer={(event) => props.setInterviewer(interviewer.id)}
    />
  })


  return (
    <section className="interviewers__list">
      {InterViewerList}
    </section>
  );



}