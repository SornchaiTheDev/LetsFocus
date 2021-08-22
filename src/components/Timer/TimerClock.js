import React, { useState, useEffect, useContext } from "react";
import {
  Base,
  Container,
  Text,
  Button,
  SetTimer,
  SetTimerInner,
  TimeInputSet,
  Icon,
} from "../../css/main";
import {
  BsStop,
  BsPlay,
  BsFillCaretUpFill,
  BsFillCaretDownFill,
} from "react-icons/bs";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { observer } from "mobx-react-lite";
import { MainStore } from "../../store/MainStore";
import TimerMode from "./TimerMode";

const SetTimerComp = observer(() => {
  const { timerStore } = useContext(MainStore);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    timerStore.mode === "focus" ? setMinutes(25) : setMinutes(5);
  }, [timerStore.mode]);

  useEffect(() => {
    if (minutes + seconds > 0) {
      if (timerStore.mode === "focus") {
        timerStore.setFocusTime = minutes * 60 + seconds;
      } else {
        timerStore.setRestTime = minutes * 60 + seconds;
      }
    }

    if (minutes > 1 && seconds === 60) setSeconds(55);
  }, [minutes, seconds]);
  const TimeSet = (digit, type, amount) => {
    if (type === "increase") {
      if (digit === "minutes") {
        setMinutes((prev) => prev + 5);
      }
      if (digit === "seconds") {
        if (amount < 60) setSeconds((prev) => prev + 5);
      }
    }
    if (type === "decrease" && amount !== 0) {
      if (digit === "minutes") {
        setMinutes((prev) => prev - 5);
      } else {
        setSeconds((prev) => prev - 5);
      }
    }
  };

  return (
    <SetTimer>
      <SetTimerInner
        background={timerStore.mode === "focus" ? "#eb3c27" : "#3F7CAC"}
      >
        <TimeInputSet>
          <Icon onClick={() => TimeSet("minutes", "increase", minutes)}>
            <BsFillCaretUpFill size="2rem" />
          </Icon>
          <Text size={2} color="white">
            {minutes.toString().padStart(2, 0)}
          </Text>
          <Icon onClick={() => TimeSet("minutes", "decrease", minutes)}>
            <BsFillCaretDownFill size="2rem" />
          </Icon>
        </TimeInputSet>
        <Text size={2} color="white">
          :
        </Text>
        <TimeInputSet>
          <Icon onClick={() => TimeSet("seconds", "increase", seconds)}>
            <BsFillCaretUpFill size="2rem" />
          </Icon>
          <Text size={2} color="white">
            {seconds.toString().padStart(2, 0)}
          </Text>
          <Icon onClick={() => TimeSet("seconds", "decrease", seconds)}>
            <BsFillCaretDownFill size="2rem" />
          </Icon>
        </TimeInputSet>
      </SetTimerInner>
    </SetTimer>
  );
});

const TimerClock = observer(() => {
  const mainContext = useContext(MainStore);
  const { timerStore } = useContext(MainStore);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (!mainContext.alert) {
      if (timerStore.isZero) {
        setStartCount(false);
        timerStore.setMode();
      }
    } else {
      setStartCount(false);
    }
  }, [timerStore.timer, startCount]);

  return (
    <>
      <TimerMode />
      <div style={{ width: 250 }}>
        {!startCount ? (
          <SetTimerComp />
        ) : (
          <CircularProgressbar
            value={(timerStore.timer / timerStore.maxTime) * 100}
            minValue={0}
            maxValue={100}
            text={timerStore.currentTime}
            styles={{
              path: {
                stroke: `white`,
                strokeLinecap: "butt",
              },

              trail: {
                stroke: "transparent",
              },

              text: {
                fill: "white",
                fontSize: "1rem",
              },
            }}
          />
        )}
      </div>

      <Button
        onClick={() => {
          if (!startCount) timerStore.countdown();
          setStartCount(!startCount);
        }}
      >
        {!startCount || timerStore.isZero ? (
          <BsPlay size="2rem" color="#0F1108" />
        ) : (
          <BsStop size="2rem" color="#0F1108" />
        )}
      </Button>
    </>
  );
});

export default TimerClock;
