import { firestore } from "./firebase";

export const focusTimeOnDb = async (
  mainStore,
  timerStore,
  todosStore,
  achievementStore
) => {
  if (
    (timerStore.isFinish && timerStore.status === "end") ||
    timerStore.status === "end_countup"
  ) {
    const focusTime = timerStore.saveFocusTime;
    const restTime = timerStore.saveRestTime;
    const achieveTime = mainStore.mode === "focus" ? focusTime : restTime;

    achievementStore.updateAchievementState = {
      mode: mainStore.mode,
      time: achieveTime,
    };
    mainStore.setFocus(focusTime);
    mainStore.setRest(restTime);
    mainStore.setFinishTask(todosStore.finishedTask);
    timerStore.resetSaveTime();
    achievementStore.uploadStatsToFirestore();
    mainStore.setMode();
    try {
      await firestore()
        .collection("users")
        .doc(mainStore.uid)
        .set(
          {
            focusTime: firestore.FieldValue.increment(focusTime),
            restTime: firestore.FieldValue.increment(restTime),
            startTime: 0,
          },
          { merge: true }
        );
    } catch {}

    achievementStore.setLastest_dated = new Date().getTime();
  }
};

export const focusTimeLocal = (mainStore, timerStore) => {
  if (
    (timerStore.isFinish && timerStore.status === "end") ||
    timerStore.status === "end_countup"
  ) {
    timerStore.resetSaveTime();
    mainStore.setMode();
  }
};
