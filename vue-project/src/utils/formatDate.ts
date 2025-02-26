import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

const formatDate = (date: string, format = "YYYY/MM/DD HH:mm:ss") => {
  return dayjs.utc(date).utcOffset(8).format(format)
}

export default formatDate
