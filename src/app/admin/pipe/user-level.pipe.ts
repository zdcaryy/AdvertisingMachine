import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userLevel'
})
export class UserLevelPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value==0){
      return '物业主管'
    }else if(value==1){
      return '物业员工'
    }else if(value==2){
      return '业主'
    }else if(value==3){
      return '公司管理员'
    }else if(value==4){
      return '租户'
    }
  }

}
