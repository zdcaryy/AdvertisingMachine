import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AdverService } from '../server/adver.service';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css'],
  animations: [
    trigger('adCover',[
      state('show',style({
        opacity:1,
      })),
      state('hide',style({
        opacity:0,
      })),
      transition('hide => show',animate('200ms ease-in')),
      transition('show => hide',animate('200ms ease-out'))
    ])
  ]
})
export class AdvertisementComponent implements OnInit {

  constructor(private adService:AdverService) { }

  // 当前显示的广告类型
  nowType:string;
  // 广告数据列表
  adver:any[];
  // 选中的广告列表
  selectedADs:any[];
  // 是否显示下拉菜单  --  项目分类
  showTypes:boolean;
  types:string[];
  // 显示弹窗 & 动画
  showModal:boolean;
  animeState:boolean;
  // 弹窗类型
  modalType:string;
  // 当前操作的广告--查看，视频，投放..
  currentAD:object;  
  // 修改的内容
  modifyAD:object;
  // 添加的内容 
  addAD:object;
  // 当前广告已经投放的区域
  launchedArea:any;
  // 是否新增分类
  ifNewType:boolean;

  ngOnInit() {
    this.initAll();    
    this.getAdver();
    this.getTypes();
  }
   
  ngAfterViewInit(){
    window.onclick = ()=>{
      this.showTypes = false;
    }
  }

  initAll(){
    this.nowType = '所有项目';
    this.adver = [];
    this.selectedADs = [];
    this.showTypes = false;
    this.types = [];
    this.showModal = false;
    this.animeState = false;
    this.modalType = '';
    this.currentAD = {};
    this.modifyAD = {};
    this.addAD = {};
    this.launchedArea = [];
    this.ifNewType = false;
    this.initAdd();
  }

  getAdver(){
   // this.adver = [
   //    {id:34564,name:"隔壁超市的薯片半价！1",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
   //    {id:34564,name:"隔壁超市的薯片半价！2",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
   //    {id:34564,name:"隔壁超市的薯片半价！3",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
   //    {id:34564,name:"隔壁超市的薯片半价！4",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
   //    {id:34564,name:"隔壁超市的薯片半价！5",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
   //    {id:34564,name:"隔壁超市的薯片半价！6",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
   //    {id:34564,name:"隔壁超市的薯片半价！7",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
   //    {id:34564,name:"隔壁超市的薯片半价！8",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
   //    {id:34564,name:"隔壁超市的薯片半价！9",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
   //    {id:34564,name:"隔壁超市的薯片半价！10",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
   //    {id:34564,name:"隔壁超市的薯片半价！11",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
   //    {id:34564,name:"隔壁超市的薯片半价！12",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
   //    {id:34564,name:"隔壁超市的薯片半价！13",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
   //    {id:34564,name:"隔壁超市的薯片半价！14",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
   //  ];
    this.adService.getData('/advertisement/findAll').subscribe(val=>{
      console.log(val);
      this.adver = val;
    });
  }
  getTypes(){
    this.adService.getData('/advertisement/findAllCategory').subscribe(res=>{
      this.types = res;
    });
    // this.types = ['美食','服装','电商','时尚','化妆品','车辆','旅游','公益','haha'];
  }

  // 选择分类
  chooseType(type){
    if(type=='all'){
      this.adService.getData('/advertisement/findAll').subscribe(res=>{
        this.nowType = '所有项目';
        this.adver = res;
        this.showTypes = false;
      })
      return;
    }
    this.adService.getData('/advertisement/findByCategory?category='+type).subscribe(res=>{
      this.nowType = type;
      this.adver = res;
      this.showTypes = false;
    })
  }

  // 修改信息
  initModify(info){
    let ad = JSON.parse(JSON.stringify(info));
    this.modifyAD = {
      name:ad.name,
      oldName:ad.name,
      category:ad.category,
      videoName:ad.videoName,
      validateDate:this.adService.formatDate(new Date(ad.validateDate),"yyyy-MM-dd hh:mm:ss"),
      expiredDate:this.adService.formatDate(new Date(ad.expiredDate),"yyyy-MM-dd hh:mm:ss")
    }
    // console.log(this.modifyAD);
  }
  private modVideo = null;
  private modPic = null;
  modifyVideo(v){
    this.modVideo = v.files.length?v.files[0]:null;
    this.adService.getThumb(v,(res)=>{
      console.log('获取视频第一帧：');
      console.log(res);
      this.modPic = res;
      this.modifyAD['videoName'] = this.modVideo?this.modVideo.name:null;
    });
  }
  modify(){
    // console.log(this.modifyAD);
    // console.log(this.modVideo);
    // console.log(this.modPic);
    let formdata = new FormData();
    formdata.append('oldName',this.modifyAD['oldName']);
    formdata.append('name',this.modifyAD['name']);
    formdata.append('category',this.modifyAD['category']);
    formdata.append('validateDate',this.modifyAD['validateDate']);
    formdata.append('expiredDate',this.modifyAD['expiredDate']);
    if(this.modVideo){
      formdata.append('video',this.modVideo);
      var imgName = this.modVideo.name.substr(0,this.modVideo.name.lastIndexOf('.'))+'.jpg';
      formdata.append('img',this.modPic,imgName);
    }
    this.adService.upFile('/advertisement/update',formdata).subscribe(res=>{
      console.log(res);
      if(res.status==0){
        this.remind('修改成功！');
      }
    });

  }

  // 投放广告
    // 查看该广告已经投放的区域
  getLaunchedArea(name){
    this.adService.getData("/advertisement/village/findVillage?advertisementName="+name).subscribe(res=>{
      console.log(res);
      this.launchedArea = res;
    });
  }
    //选择地区的事件
  selectVillage(e){
    console.log(e);
  }

  // checkbox选中事件
  chooseAD(adName,checkAD){
    if(checkAD){
      this.selectedADs.push(adName);      
    }else{
      this.selectedADs = this.selectedADs.filter(item=>{
        return item!=adName;
      });      
    }
  }

  // -- 批量删除  -- 
  delMul(){
    // console.log(this.selectedADs);
    if(!confirm("是否删除这 "+this.selectedADs.length+" 项？")){return}
    this.adService.postData("/advertisement/delete",this.selectedADs).subscribe(res=>{
      console.log(res);
      if(res.status==0){
        alert("删除成功！");
        this.ngOnInit();
      }
    });
  }

  // -- 添加广告  -- 
  //选择文件，生成缩略图
  initAdd(){
    this.addAD = {
      name:'',
      category:'',
      validateDate:'',
      expiredDate:''
    }
    this.video = null;
    this.pic = null;
  }
  private video = null;
  private pic = null;
  addVideo(v){
    this.video = v.files.length?v.files[0]:null;
    this.adService.getThumb(v,(res)=>{
      //这里还是blob，后面append到formdata中，自动转成file，name默认是blob，需要自己改，加上正确的扩展名如blob.jpg
      console.log('获取视频第一帧：');
      console.log(res);
      this.pic = res;
    });
  }
  // 确认添加
  addNew(){
    console.log(this.addAD);
    console.log(this.video);
    console.log(this.pic);
    // this.ngOnInit();
    // if(1){return}
    var formdata = new FormData();
    formdata.append('name',this.addAD['name']);
    formdata.append('category',this.addAD['category']);
    formdata.append('validateDate',this.addAD['validateDate']);
    formdata.append('expiredDate',this.addAD['expiredDate']);
    formdata.append('video',this.video);
    var imgName = this.video.name.substr(0,this.video.name.lastIndexOf('.'))+'.jpg';
    formdata.append('img',this.pic,imgName);
    this.adService.upFile("/advertisement/upload",formdata).subscribe(res=>{console.log(res)});
  }

  // 提示消息
  remind(word){
    alert(word);
    this.ngOnInit();
  }
}
