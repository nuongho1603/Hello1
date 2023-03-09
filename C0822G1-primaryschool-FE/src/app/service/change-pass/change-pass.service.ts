import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../../entity/security/account';

@Injectable({
  providedIn: 'root'
})
export class ChangePassService {

  constructor(private httpClient: HttpClient) { }

  changePass(account: any): Observable<Account> {
    return this.httpClient.patch<Account>('http://localhost:8080/api/auth/change-password', account);
  }
}
