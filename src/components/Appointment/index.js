import React from 'react'
import useVisualMode from "hooks/useVisualMode"
import './styles.scss'
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
//import { getInterview } from "helpers/selectors"
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
  
  return (
    <article className="appointment" >
      <Header className="appointment:last-of-type" id={props.id} time={props.time} />
      {mode === CREATE && <Form interviewers={[]} onCancel={() => back()}/>}
      {mode === EMPTY && <Empty onAdd={() =>transition(CREATE)} /> }

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )
      }
    
      {/* {(props.interview) ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty/>} */}
    </article>
  );
};

export default Appointment;            