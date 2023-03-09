import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Clazz} from '../entity/student/clazz';
import {HttpClient} from '@angular/common/http';
import {ClazzStudentDto} from '../dto/clazz-student-dto';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private API_URL = 'http://localhost:8080/api/clazz';

  constructor(private _httpClient: HttpClient) {
  }

  saveClass(c: any): Observable<Clazz> {
    return this._httpClient.post<Clazz>(this.API_URL + '/save', c);
  }

  findByID(id: number): Observable<ClazzStudentDto[]> {
    return this._httpClient.get<ClazzStudentDto[]>(this.API_URL + '/' + id);
  }

  getListClass(): Observable<Clazz[]> {
    return this._httpClient.get<Clazz[]>(this.API_URL + '/list-class')
  }

}
