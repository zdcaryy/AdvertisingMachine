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
  addState:boolean=false;//作用与弹框的ngIf
  files=[];//存放file类型的input选择的上传文件
  photosUrls=[];//存放预览图
  datas=[];//存放最终需要上传的文件
  renter:boolean=false;//用于判断是否是租客
  formdata;
  faceTag:boolean;//用于人脸信息是否上传的判断
  addObject={
    name:'',
    phoneNumber:'',
    ownerName:'',
    date:'',
    expiredDate:'',
    type:''
  };
  modifyObject={};
  dialog:boolean=false;

  ngOnInit() {
    this.heads = [{label: '人员姓名',field: 'name'},
      {label: '所属公司(户主)', field: 'ownerName'},
      {label: '联系电话', field: 'phoneNumber'},
      {label: '类型', field: 'type', child: ['业主','租户','物业员工','公司员工','访客','维护人员'],textConfig:{0: '业主', 1: '租户',2:'物业员工',3:'公司员工',4:'访客',5:'维护人员'},colorConfig:{0:'blue',1:'green',2:'red',3:'yellow',4:'pink',5:'purple',6:'gold'}},
      {label: '人脸特征数据', field: 'tag',child:['已通过','审核中'],textConfig:{0:'已通过',1:'审核中'},colorConfig:{0:'#119C9D',1:'#d73e3e'}},
      {label:'入住时间',field:'date'},
      {label: '操作', field: 'caozuo',operate:true,operations:['修改','删除'],colorConfig:{修改: '#119C9D',删除:'#d73e3e'}}];
  
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
      case "修改":
        if(!this.dialog){
          console.log(e);
          this.dialog=true;
          $('#modify_person').fadeIn();
          this.modifyObject=e.data;
          if(e.data.imgFeatures.length!=0){
            this.faceTag=true;
          }
          else{
            this.faceTag=false;
          }
        }
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
    // [time] is string
    // date style follow format props
    console.log(time);
    this.addObject.date=time;
  }
  handle2(time: string): void {
    // [time] is string
    // date style follow format props
    console.log(time);
    this.addObject.expiredDate=time;
  }
 
  //获取人员列表
  getPerson(){
    this.personService.getData('/person/findAll').subscribe(res=>{
      let that=this;
      this.bodys = res.map(function (item) {
        item['date']=that.timestampToTime(item.date)
        item['operate'] =  ['修改','删除'];
        return item;
      });
    })
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
      $('#add_person').fadeIn();
    }
  }
  //打开照片列表弹框
  photoDialogShow(){
    $('.img-list').fadeIn();
  }
  //添加人员
  addPerson(form):void{
    if(this.renter===true&&this.addObject.date===''){
      return;
    }
    this.formdata=new FormData($('#add-form')[0]);
    this.formdata.delete('img');
    for(let data of this.datas){
      this.formdata.append('img',data);
    }
    this.formdata.append('expiredDate',this.addObject.date);
    console.log(this.formdata.get('type'));
    this.personService.upfile('/person/save',this.formdata).subscribe(res=>{
      console.log(res);
      form.reset();
      this.formdata={}
      this.photosUrls=[];
    })
  }
  //关闭添加人员弹框
  addDialogHidden(form){
    $('#add_person').fadeOut();
    form.reset();
    this.dialog=false;
    this.formdata={}
    this.photosUrls=[];
  }
  //关闭照片列表弹框
  photoDialogHidden(){
    $('.img-list').fadeOut();
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
   console.log(e);
  }
}
