import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeacherViewDto} from '../../dto/time_table/teacher-view-dto';
import {Student} from "../../entity/student/student";
import {ClazzYear} from '../../dto/clazz/clazz-year';
import {ClazzName} from '../../dto/clazz/clazz-name';
import {ClazzTeacher} from '../../dto/clazz/clazz-teacher';
import {ClazzTeacherEdit} from '../../dto/clazz/clazz-teacher-edit';
import {TeacherInfo} from '../../dto/teacher/teacher-info';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  URL_STUDENT_LIST="http://localhost:8080/api/students/list";
  URL_STUDENT="http://localhost:8080/api/students";
  URL_STUDENT_CLAZZ="http://localhost:8080/api/students/clazz";
  URL_STUDENT_EDIT_TEACHER="http://localhost:8080/api/students/edit-teacher";
  URL_STUDENT_TEACHER_NAME_LIST="http://localhost:8080/api/students/teacher-name-list";
  URL_STUDENT_TEACHER_NAME="http://localhost:8080/api/students/teacher-name";
  URL_STUDENT_BY_TEACHER = 'http://localhost:8080/api/students/list-id-teacher';
  URL_GET_ID_TEACHER = 'http://localhost:8080/api/students/find-teacher';
  URL_STUDENT_CREATE = 'http://localhost:8080/api/students/create-student';
  URL_STUDENT_UPDATE = 'http://localhost:8080/api/students/update-student';


  constructor(private httpClient: HttpClient) {
  }

  /**
   * Create by: VanNTC
   * Date created: 01/03/2023
   * Function: get list student by id teacher
   */
  getAllStudentByIdTeacher(request: any, id: number): Observable<any> {
    const params = request;
    return this.httpClient.get<any>(`${this.URL_STUDENT_BY_TEACHER}/${id}`, {params});
  }

  getIdTeacherByIdAccount(id: string): Observable<TeacherViewDto> {
   return this.httpClient.get<TeacherViewDto>(this.URL_GET_ID_TEACHER + '/' + id);
  }

  /**
   * Created by: NuongHT
   * Date created: 01/03/2023
   * Content: method get student by studentId
   *
   * @param studentId
   * @return student
   */

  // @ts-ignore
  findById(id: number):Observable<Student> {
    return this.httpClient.get<Student>("http://localhost:8080/api/students/info/" + id);
  }




  getListStudent(year: string, clazzId: string,page:number):Observable<any> {
    return this.httpClient.get<any>(this.URL_STUDENT_LIST+'?year='+year+'&clazzId='+clazzId+'&page='+page);
  }

  getListYear():Observable<ClazzYear[]>{
    return this.httpClient.get<ClazzYear[]>(this.URL_STUDENT+'/year');
  }

  getNameClass(year: string, block: string):Observable<ClazzName[]> {
    return this.httpClient.get<ClazzName[]>(this.URL_STUDENT+'?year='+year+'&name='+block);
  }

  getClazzTeacher(year: string, clazzId: string):Observable<ClazzTeacher> {
    return this.httpClient.get<ClazzTeacher>(this.URL_STUDENT_CLAZZ+'?year='+year+'&clazzId='+clazzId);
  }

  editTeacher(clazzTeacherEdit:ClazzTeacherEdit) {
    return this.httpClient.put(this.URL_STUDENT_EDIT_TEACHER+'/'+clazzTeacherEdit.clazzId,clazzTeacherEdit);
  }

  getListNameTeacher(currentYear: number):Observable<TeacherInfo[]> {
    return this.httpClient.get<TeacherInfo[]>(this.URL_STUDENT_TEACHER_NAME_LIST+'?year='+currentYear);
  }

  getNameTeacher(idCard: string,year:number):Observable<TeacherInfo> {
    return this.httpClient.get<TeacherInfo>(this.URL_STUDENT_TEACHER_NAME+'?idCard='+idCard+'&year='+year);
  }

  deleteStudent(id: any) {
    return this.httpClient.delete(this.URL_STUDENT+'/'+id);
  }

  /**
   * Created by: HoangNM
   * Date created: 04/03/2023
   * Content: method create and update Student
   *
   * @param student
   * @return list student
   */
  saveStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.URL_STUDENT_CREATE, student);
  }

  updateStudent(student: Student) {
    return this.httpClient.put(`${(this.URL_STUDENT_UPDATE)}`, student);
  }
}
