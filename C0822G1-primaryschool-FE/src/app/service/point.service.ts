import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PointManagement} from "../entity/point/point-management";
import {EditPoint} from "../entity/point/edit-point";
import {Student} from "../entity/student/student";

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Created by: MinhCDK
   * Date created: 23/03/2023
   * Function: editPoint
   */

  editPoint(id: number, one: number, two: number) {
    const obj: EditPoint = {
      id,
      semesterOne: one,
      semesterTwo: two
    };
    return this.httpClient.put('http://localhost:8080/pointManagement/editPoint/', obj);
  }


  /**
   * Created by: MinhCDK
   * Date created: 03/03/2023
   * Function: searchStudent
   */
  searchStudent(teacherId: number, studentName: String): Observable<PointManagement[]> {
    return this.httpClient.get<PointManagement[]>('http://localhost:8080/pointManagement/search?teacherId=' + teacherId + '&studentName=' + studentName);
  }

  changeCheckbox(idCheck: number) {
    return this.httpClient.get('http://localhost:8080/pointManagement/' + idCheck);
  }
}
