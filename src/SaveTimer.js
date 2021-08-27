import { firestore } from "./firebase";

export const focusTimeOnDb = async (mainStore, timerStore, todosStore) => {
  if (timerStore.isFinish && timerStore.status === "end") {
    const focusTime = timerStore.saveFocusTime;
    const restTime = timerStore.saveRestTime;

    mainStore.setFocus(focusTime);
    mainStore.setRest(restTime);
    mainStore.setFinishTask(todosStore.finishedTask);
    timerStore.resetSaveTime();
    mainStore.setMode();
    try {
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
    } catch {}
  }
};

export const focusTimeLocal = (mainStore, timerStore) => {
  if (timerStore.isFinish && timerStore.status === "end") {
    const focusTime = timerStore.saveFocusTime;
    const restTime = timerStore.saveRestTime;

    mainStore.setFocus(focusTime);
    mainStore.setRest(restTime);
    timerStore.resetSaveTime();
    mainStore.setMode();
  }
};
