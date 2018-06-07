import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CopyService {

  constructor(private http:HttpClient) { }
  private copyUrl='http://localhost';
  getData(key:string):Observable<any>{
    return this.http.get<any>(this.copyUrl+key);
  }
  postData(key:string,data):Observable<any>{
    return this.http.post<any>(this.copyUrl+key,data);
  }

}
