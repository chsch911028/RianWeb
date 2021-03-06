import moment from "moment";

export function renderTime(year, month) {
  const firstDay = new Date(year, month, 1);
  const firstDayDay = firstDay.getDay(); // 0 = sun, 1 = mon, 2 = tues,
  // 5나 6이면 앞에만 더하고, 아니면 앞에 더하고 앞에 한주 더 추가
  // 5면 3개 더하고, 6이면 4개더함 , 0 이면 5개더함, 1이면 6개더함, 2면 7개, 3면 8개, 4면 2개
  const frontDay = firstDayDay < 2 ? -(firstDayDay + 5) : -(firstDayDay - 2);
  const backDay = 42 + frontDay;
  let timeArray = [];
  for (let week = 0; week < 6; week++) {
    let weekArray = [];
    for (let day = week * 7 + frontDay; day < week * 7 + 7 + frontDay; day++) {
      let targetDate = new Date(year, month, day - 1);
      let obj = {
        day: targetDate.getDate(),
        month: targetDate.getMonth(),
        year: targetDate.getFullYear(),
        getDay: targetDate.getDay(),
        week
      };
      weekArray.push(obj);
    }
    timeArray.push(weekArray);
  }
  return timeArray;
}

export function getCurrentWeek(first, current) {
  let startingDay = moment(first);
  let currentDay = moment(current);
  let differenceDays = currentDay.diff(startingDay, "days");
  let differenceWeek = Math.floor(differenceDays / 7);
  return differenceWeek;
}

export function sideSameMonth(
  Calendar,
  calendarMainChangeMonth,
  calendarMainChangeWeek,
  clickedWeekWed,
  weekIndex
) {
  const { sideMonth, sideYear, sideMonthDays, mainMonth, mainYear } = Calendar;
  const { day, month, year, getDay } = clickedWeekWed;
  let nextYear = year,
    nextMonth = month,
    nextWedDay = day,
    nextMonthDays,
    nextWeek;
  if (sideMonth > month || sideYear > year) {
    nextMonthDays = renderTime(nextYear, nextMonth);
    for (let i = 5; i >= 0; i--) {
      if (
        nextWedDay === nextMonthDays[i][3].day &&
        nextMonth === nextMonthDays[i][3].month
      ) {
        nextWeek = i;
        break;
      }
    }
  } else if (sideMonth < month || sideYear < year) {
    nextMonthDays = renderTime(nextYear, nextMonth);
    for (let i = 0; i < 6; i++) {
      if (
        nextWedDay === nextMonthDays[i][3].day &&
        nextMonth === nextMonthDays[i][3].month
      ) {
        nextWeek = i;
        break;
      }
    }
  } else if (sideMonth === month) {
    return calendarMainChangeWeek(weekIndex, sideMonthDays, month, year);
  }
  return calendarMainChangeMonth(nextYear, nextMonth, nextWeek, nextMonthDays);
}

export function sideDifferentMonth(
  Calendar,
  calendarMainChangeMonth,
  calendarMainChangeWeek,
  clickedWeekWed,
  weekIndex
) {
  const { sideMonth, sideYear, sideMonthDays, mainMonth, mainYear } = Calendar;
  const { day, month, year, getDay } = clickedWeekWed;
  let nextYear = year,
    nextMonth = month,
    nextWedDay = day,
    nextMonthDays,
    nextWeek;
  if (sideMonth > month || sideYear > year) {
    nextMonthDays = renderTime(nextYear, nextMonth);
    for (let i = 5; i >= 0; i--) {
      if (
        nextWedDay === nextMonthDays[i][3].day &&
        nextMonth === nextMonthDays[i][3].month
      ) {
        nextWeek = i;
        break;
      }
    }
  } else if (sideMonth < month || sideYear < year) {
    nextMonthDays = renderTime(nextYear, nextMonth);
    for (let i = 0; i < 6; i++) {
      if (
        nextWedDay === nextMonthDays[i][3].day &&
        nextMonth === nextMonthDays[i][3].month
      ) {
        nextWeek = i;
        break;
      }
    }
  } else if (sideMonth === month) {
    return calendarMainChangeMonth(sideYear, sideMonth, weekIndex, sideMonthDays);
  }
  return calendarMainChangeMonth(nextYear, nextMonth, nextWeek, nextMonthDays);}
