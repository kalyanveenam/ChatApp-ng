import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  public baseUrl = "https://chatapi.edwisor.com/api/v1/users";
  constructor(public http: HttpClient) { }

  public createUser(data) {
    const params = new HttpParams().
      set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('email', data.email)
      .set('mobileNumber', data.mobileNumber)
      .set('password', data.password)
      .set('apiKey', data.apiKey)
    return this.http.post(this.baseUrl + '/signup', params);

  }
  public getUserSignIn(data): Observable<any> {
    const params = new HttpParams().set('email', data.email).set('password', data.password);
    return this.http.post(this.baseUrl + '/login?', params)
  }
  public setLocalStorage = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }
  public getLocalStorageItem = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  }
}
