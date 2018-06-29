import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EquipService {

  constructor(private http:HttpClient) { }
  private equipUrl="http://localhost:9062";
  getData(key:string):Observable<any>{
    return this.http.get<any>(this.equipUrl+key);
  }
  postData(key:string,data):Observable<any>{
    return this.http.post<any>(this.equipUrl+key,data);
  }

}
