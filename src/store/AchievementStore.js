import { makeAutoObservable, toJS } from "mobx";
import { makePersistable } from "mobx-persist-store";
class AchievementStore {
  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    makePersistable(this, {
      name: "Achievements",
      properties: [
        "all_achieved",
        "started_date",
        "lastest_date",
        "focus_overall",
        "rest_overall",
        "focus_overall_day",
        "focus_overall_week",
        "streak_day",
        "streak_week",
        "received",
      ],
    });
    this.rootStore = rootStore;
  }
  //Dated
  started_date = null;
  lastest_date = null;

  //Lifetime Achievements
  focus_overall = 0;
  rest_overall = 0;
  finishTask = 0;

  //Streak Achievements
  focus_overall_day = 0;
  focus_overall_week = 0;
  streak_day = 0;
  streak_week = 0;

  received = [];

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
      alias: "focus_for_1_week",
      name: "โฟกัสครบ 1 สัปดาห์แล้ว",
      completed: false,
      received_dated: null,
    },

    {
      alias: "focus_for_1_month",
      name: "โฟกัสครบ 1 เดือนแล้ว",
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
      alias: "focus_more_than_8_hours_a_week",
      name: "โฟกัสมากกว่า 8 ชั่วโมงใน 1 สัปดาห์",
      completed: false,
      received_dated: null,
    },
    {
      alias: "focus_more_than_12_hours_a_week",
      name: "โฟกัสมากกว่า 12 ชั่วโมงใน 1 สัปดาห์",
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
      alias: "completed_10_tasks",
      name: "ทำรายการเสร็จ ครบ 10 รายการ",
      completed: false,
      received_dated: null,
    },
  ];

  get all() {
    return toJS(this.all_achieved);
  }

  get receivedAchievement() {
    return toJS(this.received);
  }

  set giveAchievement(alias) {
    const index = this.all_achieved.findIndex((data) => data.alias === "alias");
    const received = this.all_achieved.find(
      (achieved) => achieved.alias === alias
    );
    this.all_achieved[index] = { ...received, completed: true };
    console.log(received);
    this.received.push(received);
  }

  set updateAchievementState({ mode, time }) {
    if (mode === "focus") {
      this.focus_overall_day += time;
      this.focus_overall += time;
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

  get isReceived() {
    return this.all_achieved.some((data) => data.completed === true);
  }

  completed_Achievement(alias) {
    const index = this.all_achieved.findIndex((data) => data.alias === alias);
    this.all_achieved[index] = {
      ...this.all_achieved[index],
      completed: true,
      received_dated: new Date(),
    };
    this.received.push(this.all_achieved[index]);
  }

  checkAvailable() {
    const achievementLeft = this.all_achieved.filter(
      (data) => data.completed === false
    );

    achievementLeft.map((data) => {
      if (data.alias === "focus_1_hour") {
        console.log(this.focus_overall);
        if (this.focus_overall === 3600) this.completed_Achievement(data.alias);
      }
      if (data.alias === "focus_3_hours") {
        if (this.focus_overall === 10800)
          this.completed_Achievement(data.alias);
      }
      if (data.alias === "focus_for_3_days") {
        const started_dated =
          new Date(this.started_date).setHours(0, 0, 0, 0).valueOf() / 86400000;
        const today =
          new Date(Date.now()).setHours(0, 0, 0, 0).valueOf() / 86400000;

        if (today - started_dated === 3) this.completed_Achievement(data.alias);
      }
      if (data.alias === "focus_for_1_week") {
        const started_dated =
          new Date(this.started_date).setHours(0, 0, 0, 0).valueOf() / 86400000;
        const today =
          new Date(Date.now()).setHours(0, 0, 0, 0).valueOf() / 86400000;
        if (today - started_dated === 7) this.completed_Achievement(data.alias);
      }
      if (data.alias === "focus_for_1_month") {
        const started_dated =
          new Date(this.started_date).setHours(0, 0, 0, 0).valueOf() / 86400000;
        const today =
          new Date(Date.now()).setHours(0, 0, 0, 0).valueOf() / 86400000;
        if (today - started_dated === 30)
          this.completed_Achievement(data.alias);
      }
      if (data.alias === "focus_more_than_5_hours_a_week") {
        if (this.focus_overall_week > 18000)
          this.completed_Achievement(data.alias);
      }
      if (data.alias === "focus_more_than_8_hours_a_week") {
        if (this.focus_overall_week > 28000)
          this.completed_Achievement(data.alias);
      }
      if (data.alias === "focus_more_than_12_hours_a_week") {
        if (this.focus_overall_week > 43200)
          this.completed_Achievement(data.alias);
      }
      if (data.alias === "rest_for_1_hour") {
        if (this.rest_overall === 3600) this.completed_Achievement(data.alias);
      }
      if (data.alias === "completed_10_tasks") {
        if (this.finishTask === 10) this.completed_Achievement(data.alias);
      }
    });
    return;
  }

  acceptReceived() {
    this.received.pop();
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
}

export default AchievementStore;
