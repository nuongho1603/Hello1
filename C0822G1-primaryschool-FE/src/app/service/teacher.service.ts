import {Injectable} from '@angular/core';

import {Teacher} from "../entity/teacher/teacher";
import {PageTeacher} from '../dto/page-teacher';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const TEACHER_URL = 'http://localhost:8080/api/clazz/teacher/';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private URL_API_TEACHER = 'http://localhost:8080/teachers';
  private API_URL = 'http://localhost:8080/api/clazz';


  constructor(private  httpClient: HttpClient) {
  }

  searchTeacher(nameTeacher: any, statusTeacher: any, request: any): Observable<any> {
    const params = request;

    return this.httpClient.get<any>('http://localhost:8080/teachers?name=' + nameTeacher + '&status=' + statusTeacher, {params});

  }


  /**
   * Created by: MinhCDK
   * Date created: 03/03/2023
   * Function: findByTeacher
   */

  findByTeacherId(teacherId: number): Observable<Teacher> {
    return this.httpClient.get<Teacher>('http://localhost:8080/api/teacher/' + teacherId)
  }


  /**
   * Created by: MinhCDK
   * Date created: 03/03/2023
   * Function: editInfoTeacher
   */
  editInfoTeacher(teacher: Teacher) {
    return this.httpClient.put('http://localhost:8080/api/teacher/editInfoTeacher', teacher)
  }

  /** create by : VinhLD
   * dateCreate :02/03/2023
   * function: search teacher by name and status
   * "@param" teacherToSearch
   * "@param" pageNumber
   */
  getPageTeacher(teacherToSearch: any, pageNumber: any): Observable<PageTeacher> {
    return this.httpClient.post<PageTeacher>(this.URL_API_TEACHER + '/search?page=' + pageNumber, teacherToSearch);
  }


  getAllTeacherList(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(this.API_URL + '/teacher');
  }

  getAllTeacher(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(TEACHER_URL)
  }
}
