import { useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (!replace) { // this is if (replace is truthy)
      history.push(mode)
      setHistory(history)

    } else {// if (falsey)
      history.pop();
    }
    return setMode(mode);
  }

  const back = () => {
    if (history.length === 1) {
      return setMode(history[0])
    }
    history.pop()
    return setMode(history[history.length - 1])
  }

  return { mode, transition, back };
}

