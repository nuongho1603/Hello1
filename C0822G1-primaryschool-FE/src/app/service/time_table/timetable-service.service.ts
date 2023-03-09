import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TimeTableView} from '../../dto/time_table/time-table-view';
import {Itimetable} from "../../entity/timtable-dto/itimetable";
import {TimetableClazz} from "../../entity/timtable-dto/timetable-clazz";
import {Subject} from "../../entity/timtable-dto/subject";
import {TimetableUpdate} from "../../entity/timtable-dto/timetable-update";

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  URL_TIME_TABLE_BY_TEACHER = 'http://localhost:8080/api/timetable';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Create by: VanNTC
   * Date created: 01/03/2023
   * Function: get timetable by id teacher
   */

  getTimeTableByIdTeacher(idTeacher: number):Observable<TimeTableView[][]>{
    return this.httpClient.get<TimeTableView[][]>(`${this.URL_TIME_TABLE_BY_TEACHER}/${idTeacher}`);
  }

  /**
   * Create by NamHH
   * Date 28/02/2023
   * Function: findAllTimetable where id_clazz
   **/
  findAllTimetable(idClazz: number): Observable<Itimetable[]> {
    return this.httpClient.get<Itimetable[]>("http://localhost:8080/api/timetable/list-timetable/" + idClazz);
  }

  /**
   * Create by NamHH
   * Date 01/03/2023
   * Function: showListClazz
   **/
  showListClazz(bockId: number): Observable<Itimetable[]> {
    return this.httpClient.get<Itimetable[]>("http://localhost:8080/api/timetable/list-clazz/" + bockId);
  }


  /**
   * Create by NamHH
   * Date 01/03/2023
   * Function: showClazz
   **/
  showClazz(clazzId: number): Observable<TimetableClazz> {
    return this.httpClient.get<TimetableClazz>("http://localhost:8080/api/timetable/object-clazz/" + clazzId);
  }


  /**
   * Create by NamHH
   * Date 28/03/2023
   * Function: findAllSubject
   **/
  findAllSubject(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>("http://localhost:8080/api/timetable/list-subject");
  }

  /**
   * Create by NamHH
   * Date 01/03/2023
   * Function: update timetable where id_timetable
   **/
  update(timetableUpdate: TimetableUpdate[]) {
    return this.httpClient.put("http://localhost:8080/api/timetable/update-timetable", timetableUpdate);
  }
}
