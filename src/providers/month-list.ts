import { Locale } from "antd/es/locale";

const viMonth = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

const enMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const jaMonth = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];

export default function getMonthName(
  locale: Locale,
  monthIndex: number,
): string {
  switch (locale.locale) {
    case "vi_VN":
      return viMonth[monthIndex];
    case "ja_JP":
      return jaMonth[monthIndex];
    default:
      return enMonth[monthIndex];
  }
  // if (locale.locale === "vi") {
  // return viMonth[monthIndex];
}
