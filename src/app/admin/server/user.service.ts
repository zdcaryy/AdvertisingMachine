import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private http:HttpClient) {}
  private userUrl="http://localhost:9062";
  getData(key:string):Observable<any>{
    return this.http.get<any>(this.userUrl+key);
  }
  postData(key:string,data):Observable<any>{
    return this.http.post<any>(this.userUrl+key,data);
  }

}
