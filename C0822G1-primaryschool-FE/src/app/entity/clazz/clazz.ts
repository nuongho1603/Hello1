import {TimeTable} from "../timetable/time-table";
import {Block} from "../student/block";
import {Year} from "../student/year";
import {Teacher} from "../teacher/teacher";

export interface Clazz {
  clazzId?: number,
  timeTable?: TimeTable,
  block?: Block,
  clazzName?: string,
  year?: Year,
  teacher?: Teacher,
  flagDelete?: boolean;
  schoolYear?: string;
}
