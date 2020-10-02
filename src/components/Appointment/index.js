import React from 'react';
import useVisualMode from "hooks/useVisualMode";
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import Form from './Form'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CONFIRM = "Confirm";
const ERROR = "Error";
const SAVING = "Saving";
const CREATE = "Form";
const DELETING = "Deleting"
const Confrim = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";
const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    (props.interview) ? SHOW : EMPTY
  )

  function edit() {

  }

  function save(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
  }

  function deleting() {
    transition(DELETING)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" >
      <Header className="appointment:last-of-type" id={props.id} time={props.time} />
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={() => deleting()} message="are you sure you want to delete?" />}
      {mode === ERROR_DELETE && <Error message="Error Deleting your appointment" onClose={back}/>}
      {mode === ERROR_SAVE && <Error message="Error Saving your appointment" onClose={back}/>}
      {mode === EDIT && <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save} />}
      {mode === SHOW && (<Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)} />)
      }
    </article>
  );
};

export default Appointment;            