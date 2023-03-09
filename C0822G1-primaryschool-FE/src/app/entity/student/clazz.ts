import {TimeTable} from "../timetable/time-table";
import {Block} from "./block";
import {Year} from "./year";
import {Teacher} from "../teacher/teacher";

export interface Clazz {
  clazzId?: number,
  timeTable?: TimeTable,
  block?: Block,
  clazzName?: string,
  year?: Year,
  teacher?: Teacher
}
