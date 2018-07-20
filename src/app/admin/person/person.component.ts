import { Component, OnInit } from '@angular/core';
import{AdmachineService} from '../server/admachine.service';
import{trigger,state,style,animate,transition} from '@angular/animations';

declare var $:any;


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  animations:[
    trigger('flyInOut', [
      state('in', style({width: 300, transform: 'translateX(0)', opacity: 1})),
      transition('void => *', [
        style({width: 10, transform: 'translateX(50px)', opacity: 0}),
          animate('1s 0.1s ease', style({
            opacity: 1
          }))
      ]),
      transition('* => void', [
          animate('1s 0.1s ease', style({
            opacity: 0
          }))
      ])
    ])
  ]
})
export class PersonComponent implements OnInit {

  constructor(private personService:AdmachineService) { }
  heads: object[];
  bodys: object[];
  selectedList:object[] = [];
  textConfig: object;
  colorConfig: object;
  animateState='void';//动画状态
  previewSrc='';
  powerList=[];
  files=[];//存放file类型的input选择的上传文件
  photosUrls=[];//存放预览图
  datas=[];//存放最终需要上传的文件
  renter:boolean=false;//用于判断是否是租客
  formdata;
  faceTag:boolean;//用于人脸信息是否上传的判断
  viewPerson:boolean=false;//用于显示查看人员信息界面
  household:boolean=true;//用于判断人员类型为住户或是工作人员
  selectPower=null;//选择的人员类别
  allvillage=[];//所有的小区信息;
  selectVillage=null;//选择的小区信息
  
  /*******用于房间信息的选择********/
  allHouseList=[];//在一个小区下所有的房屋信息
  serialList=[];//楼栋列表
  unitList=[];//单元列表
  floorList=[];//楼层列表
  roomList=[];//房间号列表
  
  roomPick={
    serial:null,
    unit:null,
    floor:null,
    room:null,
  }//选择的房间
  
  roomRes={};//根据选择获取的房屋信息，包括户主的信息
  
  /*******用于房间信息的选择********/
  
  addObject={
    name:'',
    phoneNumber:'',
    ownerName:'',
    ownerPhoneNumber:'',
    date:'',
    expiredDate:'',
    type:'',
    villageName:''
  };
  modifyObject={};
  dialog:boolean=false;

  ngOnInit() {
    this.heads = [{label: '人员姓名',field: 'name'},
      {label: '所属公司(户主)', field: 'ownerName'},
      {label: '联系电话', field: 'phoneNumber'},
      {label: '类型', field: 'type', child: ['所有','业主','租户','物业员工','公司员工','访客','维护人员'],textConfig:{0: '物业主管', 1: '物业员工',2:'业主',3:'公司管理员',4:'租户',5:'机器运维人员'},colorConfig:{0:'blue',1:'green',2:'red',3:'yellow',4:'pink',5:'purple'}},
      {label: '审核状态', field: 'tag',child:['所有','已通过','审核中','未通过'],textConfig:{0:'审核中',1:'已通过',2:'未通过'},colorConfig:{0:'#d73e3e',1:'#119C9D'}},
      {label:'入住时间',field:'date'},
      {label: '操作', field: 'caozuo',operate:true,operations:['查看','删除'],colorConfig:{查看: '#119C9D',删除:'#d73e3e'}}];
  
    this.bodys = [
    ];
    this.powerList=[
      {label:'物业主管',value:'0'},
      {label:'物业员工',value:'1'},
      {label:'业主',value:'2'},
      {label:'公司管理员',value:'3'},
      {label:'租户',value:'4'},
      {label:'机器运维人员',value:'5'}
    ];//权限列表
    
    //初始化设备列表
    this.getPerson();
  }
  getOperateEvent(e) {
    switch (e.option) {
      case "删除":
        console.log(e);
        break;
      case "查看":
        this.viewPerson=true;
        console.log(e.data);
        this.modifyObject=JSON.parse(JSON.stringify(e.data));
        this.modifyObject['date']=this.timestampToTime(this.modifyObject['date']);
        this.modifyObject['expiredDate']=this.timestampToTime(this.modifyObject['expiredDate']);
        break;
    }
  }
  
  getDropdownEvent(e){
    console.log(e);
  }
  
  getSelectedList(e){
    console.log(e);
  }
  
  //读取文件
  getUpLoad(e):void{
    this.files=e.target.files;
    let that=this;
    let ps=[];//用于存储图像列表对象数组中的src属性
    for(let file of this.files){
      console.log(file);
        let reads = new FileReader();
        reads.readAsDataURL(file);//异步操作
        reads.onload = function (res) {
          console.log(res);
          for(let p of that.photosUrls){
            ps.push(p.src);
          }
          if($.inArray(res.target['result'],ps)!=-1){
            return;
          }
          else{
            //限制上传图片数量最多六张
            if(that.photosUrls.length<6){
              that.datas.push(file);
              let resize=that.renderSize(res['total']);
              console.log(resize);
              that.photosUrls.push({src:res.target['result'],name:file.name,size:resize});
              $('#fileToUpload').val('');
              $('#fileToUpload2').val('');
            }
          }
        };
    }
  }
  
  //删除待上传的图片
  removePic(url):void{
    let that=this;
    this.photosUrls.forEach((photo,i)=>{
      if(photo.src==url){
        this.photosUrls.splice(i,1);
      }
    })
    this.datas.forEach((data,i)=>{
      let reads = new FileReader();
      reads.readAsDataURL(data);//异步操作
      reads.onload = function (res) {
        if(res.target['result']==url){
          that.datas.splice(i,1);
        }
      }
    })
  }
  
  //  格式化文件大小
  renderSize(value){
    if(null==value||value==''){
      return "0 Bytes";
    }
    let unitArr = new Array("Bytes","KB","MB","GB","TB","PB","EB","ZB","YB");
    let index=0,
      srcsize = parseFloat(value);
    index=Math.floor(Math.log(srcsize)/Math.log(1024));
    let size =srcsize/Math.pow(1024,index);
    return size.toFixed(2)+unitArr[index];
  }
  
  //预览图片
  preview(src):void{
    this.animateState='in';
    this.previewSrc=src;
  }
  //关闭预览
  closePreview():void{
    this.animateState='void';
  }
  
  
  //canvas绘制缩略图
  // if(that.files.length!=0){
  //   let canvas = document.createElement('canvas');
  //   let context = canvas.getContext('2d');
  //   let img=new Image();
  //   img.src=that.src;
  //   console.log(img);
  //   img.onload=()=>{
  //     let w=100,
  //       h=w/(img.width/img.height);
  //     console.log(w);
  //     context.drawImage(img,0,0,w,h);
  //     document.getElementById('img').appendChild(canvas);
  //   }
  // }
  
  
  //日期选择处理函数
  handle1(time: string): void {
    console.log(time);
    this.addObject.date=time;
  }
  handle2(time: string): void {
    console.log(time);
    this.addObject.expiredDate=time;
  }
  handle3(time: string): void {
    console.log(time);
    this.modifyObject['date']=time;
  }
  handle4(time: string): void {
    console.log(time);
    this.modifyObject['expiredDate']=time;
  }
 
  //获取人员列表
  getPerson(){
    if(localStorage.getItem('plotSign')){
      this.personService.getData('/person/findAll/?villageName='+localStorage.getItem('plotSign')).subscribe(res=>{
        let that=this;
        this.bodys = res.map(function (item) {
          item['date']=that.timestampToTime(item.date)
          item['operate'] =  ['查看','删除'];
          return item;
        });
      })
    }
    else{
      this.personService.getData('/person/findAll').subscribe(res=>{
        let that=this;
        this.bodys = res.map(function (item) {
          item['date']=that.timestampToTime(item.date)
          item['operate'] =  ['查看','删除'];
          return item;
        });
      })
    }
  }
  //时间格式化
  timestampToTime(timestamp) {
    let date = new Date(timestamp),
    Y = date.getFullYear() + '-',
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
    D = (date.getDate()<10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
    return Y+M+D;
  }
  //打开添加人员弹框
  addDialogShow(){
    if(!this.dialog){
      this.dialog=true;
      this.addObject.villageName=localStorage.getItem('plotSign');
      //判断当前登陆的账号的权限，不同权限可添加不同的人员身份
      if(this.addObject.villageName){
        this.personService.getData('/person/getUserLevelByVillage?villageName='+this.addObject.villageName).subscribe(res=>{
          switch(res.level){
            //物业主管
            case 0:
              this.powerList.forEach((power,i)=>{
                if(i==0||i==5){
                  power.elDisabled=true;
                }
                else{
                  power.elDisabled=false;
                }
              });
              break;
              //物业员工
            case 1:
              this.household=true;
              this.powerList.forEach((power,i)=>{
                if(i==0||i==1||i==5){
                  power.elDisabled=true;
                }
                else{
                  power.elDisabled=false;
                }
              });
              break;
          }
        })
      }
      //系统管理员只能添加运维人员和物业主管
      else{
        this.household=false;
        this.personService.getData('/village/findAllVillages').subscribe(res=>{
          this.allvillage=res.villageList;
        })
        this.powerList.forEach((power,i)=>{
          if(i==1||i==2||i==3||i==4){
            power.elDisabled=true;
          }
          else{
            power.elDisabled=false;
          }
        })
      }
      this.personService.getData('/house/findAllHouseByVillage?villageName='+this.addObject.villageName).subscribe(res=>{
        console.log(res);
        if(res.status==0&&res.houseList.length!=0){
          this.allHouseList=res.houseList;
          this.getSerialList();
          for(let k in this.roomPick){
            this.roomPick[k]=null;
          }
        }
      })
      $('#add_person').fadeIn();
    }
  }
  //打开照片列表弹框
  photoDialogShow(){
    $('.img-list').fadeIn();
  }
  //添加人员
  addPerson(form):void{
    if(this.renter===true&&this.addObject.expiredDate===''){
      return;
    }
    this.formdata=new FormData($('#add-form')[0]);
    this.formdata.delete('img');
    for(let data of this.datas){
      this.formdata.append('img',data);
    }
    this.formdata.append('date',this.addObject.date);
    this.formdata.append('expiredDate',this.addObject.expiredDate);
    this.formdata.append('type',this.addObject.type);
    if(this.household){
      this.formdata.append('villageName',this.addObject.villageName);
      this.formdata.append('houseId',this.roomRes['id']);
      this.formdata.append('ownerName',this.roomRes['ownerName']);
    }
    else if(this.selectPower!=1){
      this.addObject.villageName=this.selectVillage.province+this.selectVillage.city+this.selectVillage.region+'-'+this.selectVillage.village;
      this.formdata.append('villageName',this.addObject.villageName);
      this.formdata.append('ownerName',this.addObject.ownerName);
    }
    else{
      this.formdata.append('villageName',this.addObject.villageName);
      this.formdata.append('ownerName',this.addObject.ownerName);
    }
    this.personService.upfile('/person/save',this.formdata).subscribe(res=>{
      console.log(res);
      if(res===0){
        form.reset();
        this.formdata={};
        this.photosUrls=[];
        this.roomRes=null;
      }
      else{
      
      }
    })
  }
  //关闭添加人员弹框
  addDialogHidden(form){
    $('#add_person').fadeOut();
    form.reset();
    this.dialog=false;
    this.formdata={}
    this.photosUrls=[];
    this.addObject.type=null;
    this.addObject.date=null;
    this.addObject.expiredDate=null;
  }
  //关闭照片列表弹框
  photoDialogHidden(){
    $('.img-list').fadeOut();
  }
  //打开修改人员弹框
  modifyDialogShow(){
    if(!this.dialog){
      this.dialog=true;
      this.modifyObject['type']+='';
      this.roomPick.serial=this.modifyObject['house']['serialNum'];
      this.roomPick.unit=this.modifyObject['house']['unit'];
      this.roomPick.floor=this.modifyObject['house']['floorNum'];
      this.roomPick.room=this.modifyObject['house']['roomNumber'];
      console.log(this.modifyObject);
      this.personService.getData('/house/findAllHouseByVillage?villageName='+this.modifyObject['villageName']).subscribe(res=>{
        if(res.status==0&&res.houseList.length!=0){
          this.allHouseList=res.houseList;
          this.getSerialList();
          this.initHouse();//初始化
          console.log(this.roomRes);
        }
      });
      $('#modify_person').fadeIn();
    }
  }
  //修改人员信息
  modifyPerson(){
    if(this.renter===true&&this.modifyObject['expiredDate']===''){
      return;
    }
    this.formdata=new FormData($('#modify-form')[0]);
    this.formdata.delete('img');
    for(let data of this.datas){
      this.formdata.append('img',data);
    }
    this.formdata.append('date',this.modifyObject['date']);
    this.formdata.append('expiredDate',this.modifyObject['expiredDate']);
    this.formdata.append('type',this.modifyObject['type']);
    this.personService.upfile('/person/save',this.formdata).subscribe(res=>{
      console.log(res);
      if(res===0){
        this.formdata={};
        this.photosUrls=[];
      }
      else{
      
      }
    })
  }
  //关闭修改人员弹框
  modifyDialogHidden(){
    $('#modify_person').fadeOut();
    this.dialog=false;
    this.formdata={}
    this.photosUrls=[];
  }
  
  //根据人员类型进行不同的显示
  powerCheck(e):void{
    this.selectPower=e;
    this.renter=false;
    this.household=true;
    if(e==='0'||e==='5'){
      this.household=false;
    }
    if(e==='1'){
      this.household=false;
      this.personService.getData('/village/findVillageByName?villageName='+localStorage.getItem('plotSign')).subscribe(res=>{
        console.log(res);
        if(res){
          this.addObject.ownerName=res.village.propertyComName;
        }
      })
    }
    if(e==='4'){
     this.renter=true;
    }
    else{
     this.renter=false;
    }
  }
  
  //获取楼栋列表
  getSerialList():void{
    this.serialList=[];
    this.allHouseList.map(item=>{
      if($.inArray(item.serialNum,this.serialList)===-1){
        this.serialList.push(item.serialNum);
      }
    })
    this.serialList.sort(this.compare);
  };
  //获取单元列表
  getUnitList():void{
    this.unitList=[];
    this.allHouseList.map(item=>{
      if($.inArray(item.unit,this.unitList)===-1&&item.serialNum===this.roomPick.serial){
        this.unitList.push(item.unit);
      }
    });
    this.unitList.sort(this.compare);
    this.roomPick.unit=this.unitList[0];
    this.getFloorList();
  };
  //获取楼层列表
  getFloorList():void{
    this.floorList=[];
    this.allHouseList.map(item=>{
      if($.inArray(item.floorNum,this.floorList)===-1&&item.serialNum===this.roomPick.serial&&item.unit===this.roomPick.unit){
        this.floorList.push(item.floorNum);
      }
    });
    this.floorList.sort(this.compare);
    this.roomPick.floor=this.floorList[0];
    this.getRoomList();
  };
  //获取房间列表
  getRoomList():void{
    this.roomList=[];
    this.allHouseList.map(item=>{
      if($.inArray(item.roomNumber,this.roomList)===-1&&item.serialNum===this.roomPick.serial&&item.unit===this.roomPick.unit&&item.floorNum===this.roomPick.floor){
        this.roomList.push(item.roomNumber);
      }
    })
    this.roomList.sort(this.compare);
    this.roomPick.room=this.roomList[0];
    this.getHouseConfig();
  };
  //获取具体房间信息
  getHouseConfig():void{
    this.roomRes=this.allHouseList.filter(house=>
      house.serialNum===this.roomPick.serial&&house.unit===this.roomPick.unit&&house.floorNum===this.roomPick.floor&&house.roomNumber===this.roomPick.room
    )[0];
  }
  //初始化房间选择，用于修改
  initHouse():void{
    this.allHouseList.map(item=>{
      if($.inArray(item.unit,this.unitList)===-1&&item.serialNum===this.roomPick.serial){
        this.unitList.push(item.unit);
      }
    });
    
    this.allHouseList.map(item=>{
      if($.inArray(item.floorNum,this.floorList)===-1&&item.serialNum===this.roomPick.serial&&item.unit===this.roomPick.unit){
        this.floorList.push(item.floorNum);
      }
    });

    this.allHouseList.map(item=>{
      if($.inArray(item.roomNumber,this.roomList)===-1&&item.serialNum===this.roomPick.serial&&item.unit===this.roomPick.unit&&item.floorNum===this.roomPick.floor){
        this.roomList.push(item.roomNumber);
      }
    })
    this.unitList.sort(this.compare);
    this.floorList.sort(this.compare);
    this.roomList.sort(this.compare);
    this.getHouseConfig();
  }
  
  //比较函数，用于sort升序排序使用,房屋信息录入时不一定按顺序录入
  compare(value1,value2){
    if(value1 < value2){
      return -1;
    }else if(value1 > value2){
      return 1;
    }else{
      return 0;
    }
  }
  
  //选择小区，如果身份选择为工作人员而非住户时，则显示该模块功能
  selectPosition(e):void{
    console.log(e);
    this.selectVillage=e;
    let t=this.allvillage.filter(v=>v['province']==e.province&&v['city']==e.city&&v['region']==e.region&&v['name']==e.village)[0];
    if(t){
      this.addObject.ownerName=t.propertyComName;
    }
  }
}
