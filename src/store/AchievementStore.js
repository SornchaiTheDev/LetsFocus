import { makeAutoObservable, toJS, autorun } from "mobx";
import { makePersistable } from "mobx-persist-store";
class AchievementStore {
  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    makePersistable(this, {
      name: "Achievements",
      properties: ["all_achieved"],
    });
    this.rootStore = rootStore;
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

  focus_overall_day = 0;
  focus_overall_week = 0;
  rest_overall = 0;
  started_day = null;

  get all() {
    return toJS(this.all_achieved);
  }

  change() {
    this.all_achieved[1].completed = false;
    this.all_achieved[1].received_dated = null;
  }
}

export default AchievementStore;
