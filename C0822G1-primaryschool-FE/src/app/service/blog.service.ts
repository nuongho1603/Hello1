import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})


/*
Created by: LinhPT,
Date created: 02-03/02/2023,
Describe: Take data backend getAllPage, findById
 */
export class BlogService {
  constructor(private httpClient: HttpClient) {
  }

  URL_BLOG = ('http://localhost:8080/blog');

  getAllPage(size: number): Observable<any> {
    return this.httpClient.get<any>(this.URL_BLOG + '?' + 'size=' + size);
  }

  findById(id: number) {
    return this.httpClient.get(this.URL_BLOG + '/' + id);
  }
}
