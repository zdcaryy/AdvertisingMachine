import { Injectable } from "@angular/core";
import { Http,Request,Headers,RequestMethod} from "@angular/http";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";

@Injectable()
export class AuthService {

    loginUrl: string;
    getUserUrl: string;
    str64:string="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    output:string='';

    constructor(private http: Http) { }

    // 登录
    login(user: string, pass: string){
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;
        let input=this.utf8Encode(user, 'cbpm2018');
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            this.output +=
            this.str64.charAt(enc1) + this.str64.charAt(enc2) +
            this.str64.charAt(enc3) + this.str64.charAt(enc4);
        };
        //console.log(this.output);
        return this.http.request(new Request({
            method: RequestMethod.Post,
            url: `${environment.tokenUrl}` + "/advertiseAuth/oauth/token?grant_type=password&username="+user+"&password="+pass,
            body: {},
            headers:new Headers({  
                "Authorization": "Basic "+this.output
            })
        }))
    }
    // 获取登录用户的信息
    getUserInfo(){
        return this.http.get(
            `${environment.userUrl}`+"/user/findByPhoneNumber",
            {params:{phoneNumber:localStorage.getItem('userCode'),access_token:localStorage.getItem('access_token')}}
        ).map(res => res.json())
    }
    //字符串转为utf-8
    utf8Encode(user: string, pass: string){
        let string = (user+':'+pass).replace(/\r\n/g,"\n");
        let utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
 
        }
        return utftext;
    }
}
