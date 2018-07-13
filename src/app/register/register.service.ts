import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { environment } from "../../environments/environment";

@Injectable()
export class RegisterService {

  constructor(private http:HttpClient) { }

  postData(key:string,data):Observable<any>{
    return this.http.post<any>(`${environment.userUrl}`+key,data);
  }

}