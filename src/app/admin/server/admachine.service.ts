import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AdmachineService {
  
  constructor(private http:HttpClient) { }
  private adMachineUrl="http://192.168.31.230:9062";
  getData(key:string):Observable<any>{
    return this.http.get<any>(this.adMachineUrl+key,{params:{access_token:localStorage.getItem('access_token')}});
  };
  postData(key:string,data):Observable<any>{
    key += '?access_token='+localStorage.getItem('access_token');
    return this.http.post<any>(this.adMachineUrl+key,data);
  };
  upfile(key:string,data:FormData):Observable<any>{
    data.append('access_token',localStorage.getItem('access_token'));
    return this.http.post<any>(this.adMachineUrl+key,data);
  }
}
