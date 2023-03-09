import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Clazz} from '../entity/student/clazz';
import {ClazzStudentDto} from "../dto/clazz-student-dto";

    const CLAZZ_URL = 'http://localhost:8080/api/clazz/'

@Injectable({
  providedIn: 'root'
})
export class ClazzService {

  constructor(private httpClient : HttpClient) { }

  getAllClazz(page: number, clazzName : string): Observable<Clazz[]> {
    return this.httpClient.get<Clazz[]>(CLAZZ_URL +  `?page=` + page + `&keySearch1=` + clazzName)
  }

  getAllClazzStudentDto(page: number, clazzName : string): Observable<ClazzStudentDto[]> {
    return this.httpClient.get<ClazzStudentDto[]>(CLAZZ_URL + 'class-student-dto' + `?page=` + page + `&keySearch1=` + clazzName)
  }

  getAllClazzStudent(): Observable<Clazz[]> {
    return this.httpClient.get<Clazz[]>(CLAZZ_URL)
  }

  getAllClazzStudentDtoNoPage(): Observable<ClazzStudentDto[]> {
    return this.httpClient.get<ClazzStudentDto[]>(CLAZZ_URL + 'class-student-dto-no-page' )
  }

  findById(id: number){
    return this.httpClient.get<Clazz>(`${CLAZZ_URL}info/${id}`)
  }

  findByIdClazzStudentDto(id: number){
    return this.httpClient.get<ClazzStudentDto>(`${CLAZZ_URL}info-class-student-dto/${id}`)
  }

  updateClazz(id: number, clazz: any){
    return this.httpClient.put<any>(`${CLAZZ_URL}update/${id}`, clazz)
  }

}
