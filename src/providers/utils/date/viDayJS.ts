import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";

import "dayjs/locale/vi";

dayjs.locale("vi");
dayjs.extend(isToday);

export default dayjs;

export const toViDayjs = (date: Date | string) =>
  dayjs(date).locale("vi").format("DD MMMM, YYYY");
