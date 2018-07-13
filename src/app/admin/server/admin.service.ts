import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { environment } from "../../../environments/environment";

@Injectable()
export class AdminService {

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }
  
  //获取数据
  getData(key:string,data): Observable<any>{
    return this.http.get<any>(`${environment.userUrl}`+key,{params:data})
  }
  //登录退出
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
