import { firestore } from "./firebase";

export const focusTimeOnDb = async (
  mainStore,
  timerStore,
  todosStore,
  extraCount
) => {
  if (timerStore.isFinish && timerStore.status === "end") {
    const extraCount = parseInt((Date.now() - timerStore.startTime) / 1000);

    const focusTime = timerStore.saveFocusTime + extraCount;
    const restTime = timerStore.saveRestTime + extraCount;

    mainStore.setFocus(focusTime);
    mainStore.setRest(restTime);
    mainStore.setFinishTask(todosStore.finishedTask);

    if (focusTime || restTime) {
      await firestore()
        .collection("users")
        .doc(mainStore.uid)
        .set(
          {
            focusTime: firestore.FieldValue.increment(focusTime),
            restTime: firestore.FieldValue.increment(restTime),
          },
          { merge: true }
        );
    }

    timerStore.resetSaveFocusTime();
    mainStore.setMode();
  }
};

export const focusTimeLocal = async (mainStore, timerStore) => {
  if (timerStore.isFinish && timerStore.status === "end") {
    const focusTime = timerStore.saveFocusTime;
    const restTime = timerStore.saveRestTime;

    mainStore.setFocus(focusTime);
    mainStore.setRest(restTime);
    timerStore.resetSaveFocusTime();
    mainStore.setMode();
  }
};
