import { Injectable } from "@angular/core";
import { Http,Request,Headers,RequestMethod} from "@angular/http";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";

@Injectable()
export class AuthService {

    loginUrl: string;
    getUserUrl: string;
    loginHeader = new Headers({  
        "Authorization": "Basic QWR2ZXJ0aXNlV2ViOmNicG0yMDE4"
    })

    constructor(private http: Http) { }

    // 登录
    login(user: string, pass: string){
        return this.http.request(new Request({
            method: RequestMethod.Post,
            url: `${environment.tokenUrl}` + "/advertiseAuth/oauth/token?grant_type=password&username="+user+"&password="+pass,
            body: {},
            headers:this.loginHeader
        }))
    }
    // 获取登录用户的信息
    getUserInfo(){
        return this.http.get(
            `${environment.userUrl}`+"/user/findByPhoneNumber",
            {params:{phoneNumber:localStorage.getItem('userCode'),access_token:localStorage.getItem('access_token')}}
        ).map(res => res.json())
    }
}
