import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AreaService {

  constructor(private http:HttpClient) { }

  //获取信息
  getDate(key:string,date): Observable<any>{
  	return this.http.get<any>(`${environment.userUrl}`+key,{params:date});		
  }

}
