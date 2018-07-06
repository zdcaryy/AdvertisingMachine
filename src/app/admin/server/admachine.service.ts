import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AdmachineService {
  
  constructor(private http:HttpClient) { }
  private adMachineUrl="http://localhost:9062";
  getData(key:string):Observable<any>{
    return this.http.get<any>(this.adMachineUrl+key);
  };
  postData(key:string,data):Observable<any>{
    return this.http.post<any>(this.adMachineUrl+key,data);
  };
  
}
