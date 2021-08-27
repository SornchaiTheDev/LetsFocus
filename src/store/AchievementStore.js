import { makeAutoObservable, toJS } from "mobx";
import { makePersistable } from "mobx-persist-store";
class AchievementStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    makePersistable(this, {
      name: "Achievements",
      properties: ["all_achieved"],
    });
  }

  all_achieved = [
    {
      alias: "focus_1_hour",
      name: "โฟกัสครบ 1 ชั่วโมง",
      completed: false,
      received_dated: null,
    },
    {
      alias: "focus_3_hours",
      name: "โฟกัสครบ 3 ชั่วโมง",
      completed: false,
      received_dated: null,
    },
    {
      alias: "focus_continue_3_days",
      name: "โฟกัสครบ 3 วันแล้ว",
      completed: false,
      received_dated: null,
    },
    {
      alias: "focus_continue_5_days",
      name: "โฟกัสครบ 1 สัปดาห์แล้ว",
      completed: false,
      received_dated: null,
    },
    {
      alias: "focus_1_week",
      name: "โฟกัสครบ 1 สัปดาห์แล้ว",
      completed: false,
      received_dated: null,
    },
    {
      alias: "focus_more_than_3_hour_a_week",
      name: "โฟกัสครบ 1 สัปดาห์แล้ว",
      completed: false,
      received_dated: null,
    },
    {
      alias: "focus_more_than_5_hour_a_week",
      name: "โฟกัสครบ 1 สัปดาห์แล้ว",
      completed: false,
      received_dated: null,
    },
    {
      alias: "rest_more_than_1_hour",
      name: "โฟกัสครบ 1 สัปดาห์แล้ว",
      completed: false,
      received_dated: null,
    },
    {
      alias: "completed_10_todos",
      name: "โฟกัสครบ 1 สัปดาห์แล้ว",
      completed: false,
      received_dated: null,
    },
  ];

  get all() {
    return toJS(this.all_achieved);
  }
}

export default AchievementStore;
