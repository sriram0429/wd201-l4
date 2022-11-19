/* eslint-disable no-undef */
const todo = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todo();
const todayDate = new Date().toLocaleDateString("en-CA");
describe("TODO test suite", () => {
  beforeAll(() => {
    add({
      title: "turn on radio",
      dueDate: todayDate,
      completed: false,
    });
  });
  test("Add task", () => {
    let before = all.length;
    add({
      title: "brush your teeth",
      dueDate: todayDate,
      completed: false,
    });
    expect(all.length).toBe(before + 1);
  });
  test("Mark task as complete", () => {
    all[0].completed = false;
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Over due tasks", () => {
    const overDueItems = overdue();
    var prev_date = new Date();
    prev_date.setDate(prev_date.getDate() - 1);
    let yesterday = prev_date.toLocaleDateString("en-CA");
    add({
      title: "Eat breakfast",
      dueDate: yesterday,
      completed: false,
    });
    expect(overdue().length).toBe(overDueItems.length + 1);
  });
  test("Due today tasks", () => {
    const todayItems = dueToday();
    add({
      title: "Cycling",
      dueDate: todayDate,
      completed: false,
    });
    expect(dueToday().length).toBe(todayItems.length + 1);
  });
  test("Due later tasks", () => {
    const duelaterItems = dueLater();
    var tomorrow_date = new Date();
    tomorrow_date.setDate(tomorrow_date.getDate() + 1);
    let tomDate = tomorrow_date.toLocaleDateString("en-CA");
    add({
      title: "Feed tommy",
      dueDate: tomDate,
      completed: false,
    });
    expect(dueLater().length).toBe(duelaterItems.length + 1);
  });
});
