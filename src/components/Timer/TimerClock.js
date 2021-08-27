import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  Button,
  SetTimer,
  SetTimerInner,
  TimeInputSet,
  Icon,
  Group,
} from "../../css/main";
import {
  BsStop,
  BsPlay,
  BsFillCaretUpFill,
  BsFillCaretDownFill,
  BsSkipEnd,
} from "react-icons/bs";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { observer } from "mobx-react-lite";
import { MainStore } from "../../store/MainStore";
import TimerMode from "./TimerMode";

const SetTimerComp = observer(() => {
  const { timerStore } = useContext(MainStore);
  const mainStore = useContext(MainStore);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    timerStore.setTime = minutes * 60 + seconds;
    if (minutes > 1 && seconds === 60) setSeconds(55);

    if (timerStore.status === "idle") {
      timerStore.saveTime = minutes * 60 + seconds;
    }
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
        background={mainStore.mode === "focus" ? "#eb3c27" : "#3F7CAC"}
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

const TimerClock = observer(({ stopConfirm }) => {
  const { timerStore } = useContext(MainStore);

  const getCircularValue = () => {
    if (timerStore.status !== "extra")
      return (timerStore.timer / timerStore.maxTime) * 100;

    return 100;
  };

  return (
    <>
      <TimerMode />
      <div style={{ width: 250 }}>
        {timerStore.isFinish && timerStore.status !== "extra" ? (
          <SetTimerComp />
        ) : (
          <CircularProgressbar
            value={getCircularValue()}
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

      <Group direction="column" gap={16} align="center">
        <Button
          onClick={() => {
            if (
              timerStore.isFinish &&
              timerStore.status !== "extra" &&
              timerStore.timer > 0
            ) {
              timerStore.startTime = new Date(
                Date.now() + timerStore.timer * 1000
              ).getTime();

              timerStore.countdown();
            }
            if (
              timerStore.maxTime - timerStore.timer > 0 &&
              timerStore.status !== "extra"
            ) {
              stopConfirm();
            }

            if (timerStore.status === "extra") {
              timerStore.isFinish = true;
              timerStore.status = "end";
            }
          }}
        >
          {timerStore.isFinish ? (
            <BsPlay size="2rem" color="#0F1108" />
          ) : (
            <BsStop size="2rem" color="#0F1108" />
          )}
        </Button>
        <Text size={1} weight="500" color="white">
          {timerStore.status === "idle" ? "เริ่มจับเวลา" : "หยุดจับเวลา"}
        </Text>
      </Group>
    </>
  );
});

export default TimerClock;
