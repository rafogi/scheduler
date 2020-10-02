import React from 'react'
import useVisualMode from "hooks/useVisualMode"
import './styles.scss'
import Header from './Header'
import Show from './Show'
import Empty from './Empty'

import Form from './Form'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CONFIRM = "Confirm";
const ERROR = "Error";
const STATUS = "Status";
const CREATE = "Form"

const Appointment = (props) => {
  const {mode,transition, back} = useVisualMode(
    (props.interview) ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id,interview)
  }
  
  return (
    <article className="appointment" >
      <Header className="appointment:last-of-type" id={props.id} time={props.time} />
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()}  onSave={save}/>}
      {mode === EMPTY && <Empty onAdd={() =>transition(CREATE)} /> }

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )
      }
    </article>
  );
};

export default Appointment;            