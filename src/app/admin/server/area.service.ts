import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AreaService {

  constructor(private http:HttpClient) { }

  getData(key:string): Observable<any>{
  	return this.http.get<any>(`${environment.userUrl}`+key);		
  }

}
