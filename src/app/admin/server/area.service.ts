import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http,Request,Headers,RequestMethod} from "@angular/http";
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AreaService {

  constructor(
    private httpz: Http,
    private http:HttpClient
  ) { }
  //获取小区
  getVillage(key:string): Observable<any>{
  	return this.http.get<any>(`${environment.userUrl}`+key,{params:{phoneNumber:localStorage.getItem('userCode'),access_token:localStorage.getItem('access_token')}});		
  }
  //获取小区
  searchVillage(key:string,village:string): Observable<any>{
    return this.http.get<any>(`${environment.userUrl}`+key,{params:{phoneNumber:localStorage.getItem('userCode'),ViliiageName:village,access_token:localStorage.getItem('access_token')}});		
  }
  //小区模糊搜索
  dimVillage(key:string,village:string): Observable<any>{
    return this.httpz.request(new Request({
        method: RequestMethod.Get,
        url: `${environment.userUrl}` + key +'?phoneNumber='+localStorage.getItem('userCode')+'&villageName='+village,
        body: {},
        headers:new Headers({  
            "access_token": localStorage.getItem('access_token')
        })
    }))

    //return this.http.get<any>(`${environment.userUrl}`+key,{params:{phoneNumber:localStorage.getItem('userCode'),villageName:village,access_token:localStorage.getItem('access_token')}});		
  }
}
