import { useState, useRef } from "react";

export default function useLongPress({onPress}) {
  const [action, setAction] = useState();
  const [progress, setProgress] = useState(0);

  const timerRef = useRef();
  const isLongPress = useRef();
  const intervalRef = useRef(null);
  const thresholdTime = 1000;

  const startPressTimer = () => {
    clearTimeout(timerRef.current);
    isLongPress.current = false;

    intervalRef.current = setInterval(() => {
        setProgress(progress => progress + 1/100);
      }, thresholdTime/100);

    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setAction("longpress")
      onPress();
    }, thresholdTime);
  };

  const resetProgress = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setProgress(0);
  };

  const handleOnPointerDown = () => {
    resetProgress();
    if (action === "longpress") return;
    startPressTimer();
  }

  const handleOnPointerUp = () => {
    clearTimeout(timerRef.current);
    resetProgress();
  }

  return {
    action,
    progress, 
    handlers: {
        onPointerDown: handleOnPointerDown,
        onPointerUp: handleOnPointerUp
    }
  }
}

