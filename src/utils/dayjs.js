import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "@/utils/dayjs";
dayjs.locale("zh-cn");
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
// console.log(dayjs().to(dayjs("2021-01-01")));
