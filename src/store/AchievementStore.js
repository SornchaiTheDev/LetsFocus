import { makeAutoObservable, toJS } from "mobx";
import { makePersistable } from "mobx-persist-store";
class AchievementStore {
  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    makePersistable(this, {
      name: "Achievements",
      properties: [
        "all_achieved",
        "focus_overall_day",
        "focus_overall_week",
        "rest_overall",
        "started_date",
        "lastest_date",
        "streak_day",
        "streak_week",
      ],
    });
    this.rootStore = rootStore;
  }

  focus_overall_day = 0;
  focus_overall_week = 0;
  rest_overall = 0;
  started_date = null;
  lastest_date = null;
  streak_day = 0;
  streak_week = 0;

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
      alias: "focus_for_3_days",
      name: "โฟกัสครบ 3 วันแล้ว",
      completed: false,
      received_dated: null,
    },
    {
      alias: "focus_for_5_days",
      name: "โฟกัสครบ 5 วันแล้ว",
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
      alias: "focus_more_than_5_hours_a_week",
      name: "โฟกัสมากกว่า 5 ชั่วโมงใน 1 สัปดาห์",
      completed: false,
      received_dated: null,
    },
    {
      alias: "rest_for_1_hour",
      name: "พักครบ 1 ชั่วโมง",
      completed: false,
      received_dated: null,
    },
    {
      alias: "completed_10_todos",
      name: "ทำรายการเสร็จ ครบ 10 รายการ",
      completed: false,
      received_dated: null,
    },
  ];

  get all() {
    return toJS(this.all_achieved);
  }

  get received() {
    return {
      alias: this.all_achieved[2].alias,
      name: this.all_achieved[2].name,
    };
  }

  set updateAchievementState({ mode, time }) {
    if (mode === "focus") {
      this.focus_overall_day += time;
      this.focus_overall_week += time;
    }
    if (mode === "rest") this.rest_overall += time;
  }

  set setStarted_dated(date) {
    this.started_date = date;
  }
  set setLastest_dated(date) {
    this.lastest_date = date;
  }
  updateStreak() {
    this.streak_day += 1;
    this.focus_overall_day = 0;
  }
  clearStreak() {
    this.streak_day = 0;
  }

  clearOverall() {
    this.focus_overall_week = 0;
  }

  change() {
    this.all_achieved[1].completed = false;
    this.all_achieved[1].received_dated = null;
  }
}

export default AchievementStore;
