import dayjs, { Dayjs } from "dayjs";
import locale from "dayjs/locale/vi";

dayjs.locale(locale);

const checkinTime = "08:00";
const checkoutTime = "17:30";
const startLunchTime = "12:00";
const endLunchTime = "13:30";

function convertToToday(baseDay: Dayjs, time: string): Dayjs {
  const [hour, minute] = time.split(":").map(Number);
  return baseDay.hour(hour).minute(minute);
}

const getStandardWorkAndLunchTimeInMinutes = () => {
  const today = dayjs();
  const workStart = convertToToday(today, checkinTime);
  const workEnd = convertToToday(today, checkoutTime);
  const lunchStart = convertToToday(today, startLunchTime);
  const lunchEnd = convertToToday(today, endLunchTime);

  const workDuration = workEnd.diff(workStart, "minutes");
  const lunchDuration = lunchEnd.diff(lunchStart, "minutes");

  return [workDuration - lunchDuration, lunchDuration];
};

function countWorkingMinutesIgnore2Ends(
  startDate: Dayjs,
  endDate: Dayjs,
): number {
  let count = 0;
  let currentDate = startDate.add(1, "day").startOf("day"); // Ignore start date
  const end = endDate.subtract(1, "day").startOf("day"); // Ignore end date

  while (currentDate.isBefore(end, "day") || currentDate.isSame(end, "day")) {
    const dayOfWeek = currentDate.day();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Exclude Sunday (0) and Saturday (6)
      count++;
    }
    currentDate = currentDate.add(1, "day");
  }

  const standardWorkingMinutes = getStandardWorkAndLunchTimeInMinutes()[0];

  return count * standardWorkingMinutes;
}

/**
 *  there are 4 moments that the start time can be, as presented below:
 *  <pre>
 *         checkin              lunch start    lunch end               checkout
 *             ↓                     ↓              ↓                     ↓
 *             |---------------------|______________|---------------------|
 *     ↑                   ↑                 ↑                 ↑                   ↑
 *  Too early         Morning shift     In lunchtime     Afternoon shift       Don't care
 *   </pre>
 *   The function will calculate the leave time of the first end time based on the scenario above.
 * @param start the start time of the leave request
 * @returns the amount of leave time of the first start time
 */
const getLeaveTimeOfFirstEnd = (start: Dayjs) => {
  if (start.day() === 0 || start.day() === 6) {
    return 0;
  }

  const checkin = convertToToday(start, checkinTime);
  const checkout = convertToToday(start, checkoutTime);
  const lunchStart = convertToToday(start, startLunchTime);
  const lunchEnd = convertToToday(start, endLunchTime);

  let totalMinutes = 0;

  if (start.isBefore(checkin)) {
    totalMinutes +=
      checkout.diff(checkin, "minutes") - lunchEnd.diff(lunchStart, "minutes");
  } else if (start.isBefore(lunchStart)) {
    totalMinutes +=
      checkout.diff(start, "minutes") - lunchEnd.diff(lunchStart, "minutes");
  } else if (start.isBefore(lunchEnd)) {
    totalMinutes += checkout.diff(lunchEnd, "minutes");
  } else if (start.isBefore(checkout)) {
    totalMinutes += checkout.diff(start, "minutes");
  }

  return totalMinutes;
};

/**
 *  there are 4 moments that the end time can be, as presented below:
 *  <pre>
 *         checkin              lunch start    lunch end               checkout
 *             ↓                     ↓              ↓                     ↓
 *             |---------------------|______________|---------------------|
 *       ↑                ↑                 ↑                 ↑                   ↑
 *  Don't care      Morning shift     In lunchtime     Afternoon shift         Too late
 *   </pre>
 *   The function will calculate the leave time of the second end time based on the scenario above.
 * @param end the end time of the leave request
 * @returns the amount of leave time of the second end time
 */
const getLeaveTimeOfSecondEnd = (end: Dayjs) => {
  if (end.day() === 0 || end.day() === 6) {
    return 0;
  }

  const checkin = convertToToday(end, checkinTime);
  const checkout = convertToToday(end, checkoutTime);
  const lunchStart = convertToToday(end, startLunchTime);
  const lunchEnd = convertToToday(end, endLunchTime);

  let totalMinutes = 0;

  if (end.isAfter(checkout)) {
    totalMinutes +=
      checkout.diff(checkin, "minutes") - lunchEnd.diff(lunchStart, "minutes");
  } else if (end.isAfter(lunchEnd)) {
    totalMinutes +=
      end.diff(checkin, "minutes") - lunchEnd.diff(lunchStart, "minutes");
  } else if (end.isAfter(lunchStart)) {
    totalMinutes += lunchStart.diff(checkin, "minutes");
  } else if (end.isAfter(checkin)) {
    totalMinutes += end.diff(checkin, "minutes");
  }

  return totalMinutes;
};

function leaveTimeOnSameDay(start: Dayjs, end: Dayjs): number {
  const lunchStart = convertToToday(start, startLunchTime);
  const lunchEnd = convertToToday(start, endLunchTime);

  let totalLeaveMinutes = end.diff(start, "minute");

  // Check for overlap with lunchtime.
  if (start.isBefore(lunchEnd) && end.isAfter(lunchStart)) {
    let lunchOverlapStart = start.isBefore(lunchStart) ? lunchStart : start;
    let lunchOverlapEnd = end.isAfter(lunchEnd) ? lunchEnd : end;

    totalLeaveMinutes -= lunchOverlapEnd.diff(lunchOverlapStart, "minute");
  }

  return totalLeaveMinutes;
}

/**
 * Round to the nearest half hour,
 *
 * e.g. 1.1 -> 1.5, 1.6 -> 2, 3 -> 3
 * @param hour
 */
function roundToNearestHalfHour(hour: number): number {
  return Math.ceil(hour * 2) / 2;
}

function calculateLeaveMinutes(start: Dayjs, end: Dayjs): number {
  const checkIn: Dayjs = convertToToday(start, checkinTime);
  const checkOut: Dayjs = convertToToday(end, checkoutTime);

  if (start.isBefore(checkIn)) {
    throw new Error("Start request must be within working hours.");
  }

  if (end.isAfter(checkOut)) {
    throw new Error("End request must be within working hours.");
  }

  if (start.isAfter(end)) {
    return 0;
  }

  if (start.isSame(end, "day")) {
    return leaveTimeOnSameDay(start, end);
  }

  let totalMinutes = 0;

  totalMinutes += countWorkingMinutesIgnore2Ends(start, end);
  totalMinutes += getLeaveTimeOfFirstEnd(start);
  totalMinutes += getLeaveTimeOfSecondEnd(end);

  return totalMinutes;
}

export function calculateLeaveHour(start: Dayjs, end: Dayjs): number {
  const totalMinutes = calculateLeaveMinutes(start, end);
  return roundToNearestHalfHour(totalMinutes / 60);
}

// interface Ex {
//     start: Dayjs;
//     end: Dayjs;
// }
//
// // Test cases as provided
// const example: Ex[] = [
//     {
//         start: dayjs('2025-03-11T08:00:00.000'),
//         end: dayjs('2025-03-11T17:30:00.000') // 8 hours
//     },
//     {
//         start: dayjs('2025-03-11T08:00:00.000'),
//         end: dayjs('2025-03-11T14:20:00.000') // 5 hours
//     },
//     {
//         start: dayjs('2025-03-11T08:00:00.000'),
//         end: dayjs('2025-03-11T14:45:00.000') // 5.5 hours
//     },
//     {
//         start: dayjs('2025-03-14T11:00:00.000'),
//         end: dayjs('2025-03-17T09:15:00.000') // 6.5 hours
//     },
//     {
//         start: dayjs('2025-03-16T11:00:00.000'),
//         end: dayjs('2025-03-17T09:15:00.000') // 1.5 hours
//     },
//     {
//         start: dayjs('2025-03-10T11:00:00.000'),
//         end: dayjs('2025-03-17T15:20:00.000') // 43 hours
//     }
// ];
//
// try {
//     example.forEach((ex, index) => {
//         const start = ex.start.format('dddd, ngày DD MMMM [năm] YYYY, lúc HH:mm');
//         const end = ex.end.format('dddd, ngày DD MMMM [năm] YYYY, lúc HH:mm');
//
//         console.log("--------------------------------------------");
//         console.log(start);
//         console.log(end);
//
//         const result = calculateLeaveHour(ex.start, ex.end);
//         console.log(`Test case ${index + 1}: ${result} hours`);
//     })
// } catch (error) {
//     if (error instanceof Error) {
//         console.error(error.message);
//     } else {
//         console.error("An unknown error occurred");
//     }
//
// }
