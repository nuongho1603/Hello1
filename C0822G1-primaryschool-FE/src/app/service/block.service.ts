import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Clazz} from '../entity/student/clazz';
import {Block} from '../entity/student/block';

  const BLOCK_URL = 'http://localhost:8080/api/clazz/block/'

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  constructor(private httpClient : HttpClient) { }

  getAllBlock(): Observable<Block[]> {
    return this.httpClient.get<Block[]>(BLOCK_URL)
  }

}
