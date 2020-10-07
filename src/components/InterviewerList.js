import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types'

export default function InterviewerList(props) {



  const InterViewerList = props.interviewers.map((interviewer) =>  {
    return <InterviewerListItem
    key = {interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id===props.interviewer}
    setInterviewer={() => props.setInterviewer(interviewer.id)}
    />
  })

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };

  return (
    <section className="interviewers__list">
      {InterViewerList}
    </section>
  );

}