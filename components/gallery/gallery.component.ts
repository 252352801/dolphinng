import {Component, Input,ElementRef,OnInit,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.less']
})
export class GalleryComponent implements OnInit{

  @Input() data: any[] = [];
  @Input() dataProps: string[] = [];
  @Input() size:any;
  @Output() change:EventEmitter<any>=new EventEmitter();

  @Input() title:string='';

  images: string[] = [];
  render: boolean = false;
  visible: boolean = false;
  ready: boolean = false;

  left: number|string= 0;//当前left
  top: number |string= 0;//当前top
  tempLeft: number|string = 0;
  tempTop: number |string= 0;
  thumbScrollWidth:number=0;
  private transitionTime: number = 300;//过渡时间ms

  activeIndex: number = 0;

  isThumbOverflow:boolean=false;//是否缩略图溢出
  isEventSource:boolean=false;//是否有事件源
  isShowTools:boolean=false;

  isSupportCssObjectFit:boolean=false;//是否支持css object-fit属性

  private resizeCheckTimer:any;
  private thumbSlideTimer:any;
  private resizeHandler:any;
  private windowClickHandler:any;
  private tween = {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
  };

  constructor(private eleRef:ElementRef) {

  }

  ngOnInit(){
    let elem=document.createElement('IMG');
    if(elem.style['objectFit']!==undefined){
      this.isSupportCssObjectFit=true;
    }
    elem=null;


  }


  /**
   * 检查是否溢出
   */
  private checkIsThumbOverflow(){
    let elem=this.eleRef.nativeElement.querySelector('.gallery-thumb-sliders');
    let check=()=>{
      if(this.images.length > 1) {
        if(elem&&elem['offsetWidth']>0) {
          this.isThumbOverflow = elem && (elem.scrollWidth > elem.clientWidth);
          if (this.isThumbOverflow) {
            let galleryThumbScroll = this.eleRef.nativeElement.querySelector('.gallery-thumb-scroll');
            let thumbSliders = galleryThumbScroll.querySelectorAll('.gallery-thumb-slider');
            if (thumbSliders.length > 0) {
              this.thumbScrollWidth = thumbSliders[0]['offsetWidth'] * thumbSliders.length;
              if (this.thumbScrollWidth < elem.scrollWidth) {
                this.isThumbOverflow = false;
              }
            }
          }
        }else{
          setTimeout(check,10);
        }
      }
    };
    check();
  }


  /**
   * 初始化图片数据
   * @param data
   * @param props
   */
  private initImages(data:any[],props:string[]){
    this.images=[];
    if (data.length > 0) {
      for (let o of data) {
        if (props.length > 0) {
          this.images.push(this.getValueByProps(o, props));
        } else {
          this.images.push(o);
        }
      }
    }
  }

  slideThumbAfterChange(direction:number){
    clearTimeout(this.thumbSlideTimer);
    this.thumbSlideTimer=setTimeout(()=>{
      let sliderWrap=this.eleRef.nativeElement.querySelector('.gallery-thumb-sliders');
      let perW=this.eleRef.nativeElement.querySelector('.gallery-thumb-slider').offsetWidth;
      let scrollL=sliderWrap.scrollLeft;
      let sliderW=sliderWrap.clientWidth;
      if(direction===0){
        let refValue=(this.activeIndex)*perW;
        if(scrollL>refValue){
          this.slide(sliderWrap,refValue-scrollL);
        }
      }else if(direction===1){
        let validScrollLeft=perW*(this.activeIndex+1)-sliderW;
        if(validScrollLeft>scrollL){
          this.slide(sliderWrap,validScrollLeft-scrollL);
        }
      }
    });
  }

  /**
   * 缩略图滚动
   * @param elem
   * @param direction
   */
  slideThumb(elem:HTMLElement,direction:number){
    var val=0;
    var thumbItem=elem.querySelector('.gallery-thumb-slider');
    var thumbItemWidth=thumbItem['offsetWidth'];
    if(direction==0){
      val=-elem.clientWidth;
    }else{
      val=Math.floor(elem.clientWidth/thumbItemWidth)*thumbItemWidth;
    }
    var canScrollVal=elem.scrollWidth-elem.scrollLeft;
    if(val>canScrollVal){
      val=Math.floor((canScrollVal)/thumbItemWidth)*thumbItemWidth;
    }
    this.slide(elem,val);
  }

  /**
   * 滚动
   * @param elem 滚动的元素
   * @param val  滚动值
   */
  slide(elem:HTMLElement,val:number){
    var scrollLen=val;
    {
      var fps=60;//帧数
      var run_time=300;//执行时间
      var t_o=1000/fps;//每改变一次的时间间隔
      var t=0;//开始时间
      var b=elem.scrollLeft;//初始值
      var c=scrollLen;//变化量
      var d=run_time/t_o;//次数
      var animate=this.tween.easeInOut;//选择算法
    }

    var timer=setInterval(function(){
      var newVal=Math.ceil(animate(t, b, c, d));
      elem.scrollLeft=newVal;
      if(t<d){
        t++;
      }else{
        clearInterval(timer);
      }
    },t_o);
  }

  /**
   * 通过属性名获取值
   * @param obj
   * @param pros
   * @returns {Object}
   */
  private getValueByProps(obj: Object, pros: string[]): any {
      let result = obj;
      for (let prop of pros) {
        if(typeof result==='object') {
          result = result[prop];
        }
      }
      return result;
  }

  /**
   * 打开
   * @param event 点击事件
   * @param index 图片下标
   * @param data 图片所在数据对象
   * @param props 数据属性（通过这些属性逐级访问）
   */
  open(event?: Event, index?: number,data?:any[],props?:string[]) {
    this.render = true;
    this.isShowTools=true;
    let dataIndex = 0;//索引
    let ev;//事件源

    let paramStrArr=[];//字符串数组参数容器
    let imgSrc='';
    if (arguments.length > 0) {//参数处理
      for(let i in arguments){
        if (arguments[i] instanceof MouseEvent) {
          ev = arguments[i];
        }
        if (typeof arguments[i] === 'number') {
          dataIndex = arguments[i];
        }
        if(arguments[i] instanceof Array){
          paramStrArr.push(arguments[i]);
        }
        if(typeof arguments[i] === 'string'){
          if(!imgSrc){
            imgSrc=arguments[i];
          }else{
            this.title=arguments[i];//title
          }
        }
      }
    }
    let dataObj=this.data;
    let dataProps=this.dataProps;
    if(imgSrc!==''){
      dataObj=[imgSrc];
      dataProps=[];
      dataIndex=0;
    }else{
      if(paramStrArr.length>0){
        dataObj=paramStrArr[0];
      }
      if(paramStrArr.length>1){
        dataProps=paramStrArr[1];
      }
    }
    this.initImages(dataObj,dataProps);
    let maxIndex=dataObj.length-1;
    this.activate(dataIndex>maxIndex?maxIndex:dataIndex);
    if (ev) {//根据事件源获取鼠标点击位置，从而从该位置弹出
      this.isEventSource=true;
      let pos = this.getMousePosition(ev);
      this.tempLeft = pos.left+'px';
      this.tempTop = pos.top+'px';
      this.left=this.tempLeft;
      this.top=this.tempTop;
    } else {
      this.isEventSource=false;
      this.tempLeft = '0';
      this.tempTop = '0';
    }
    setTimeout(()=> {//显示
      this.visible = true;
      if(this.size=='lg'){
        this.left = '10%';
        this.top ='10%';
      }else if(this.size=='md'){
        this.left = '20%';
        this.top ='20%';
      }else if(this.size=='sm'){
        this.left = '30%';
        this.top ='30%';
      }else if(this.size=='xs'){
        this.left = '37.5%';
        this.top ='37.5%';
      }else{
        this.left = '0';
        this.top = '0';
      }
    });

    setTimeout(()=> {
      this.ready = true;//就绪
      this.checkIsThumbOverflow();//检查是否溢出
    },this.transitionTime);

    {//监听窗口大小变化
      this.resizeHandler = ()=> {
        clearTimeout(this.resizeCheckTimer);
        this.resizeCheckTimer = setTimeout(()=> {
          this.checkIsThumbOverflow();
        }, 300);
      };
      window.addEventListener('resize', this.resizeHandler);
    }

    {//点击窗口空白处
      this.windowClickHandler = ()=> {
        if(this.size){
          this.close();
        }
      };
      setTimeout(()=>{
        window.addEventListener('click',this.windowClickHandler);
      });
    }

  }

  /**
   * 关闭
   */
  close() {
    this.visible = false;
    if(this.isEventSource) {
      this.left = this.tempLeft;
      this.top = this.tempTop;
    }
    this.ready = false;
    setTimeout(()=> {
      this.render = false;
    }, this.transitionTime);
    window.removeEventListener('resize', this.resizeHandler);//取消监听
    window.removeEventListener('click', this.windowClickHandler);//取消监听
  }

  /**
   * 点击空白处
   */
  whiteSpaceClickAction(){
    if(!this.size){
      this.close();
    }
  }

  wrapClickAction(ev:Event){
    if(this.size){
      ev.stopPropagation();
    }
  }


  /**
   * 上一张
   */
  prev() {
    if (this.activeIndex > 0) {
      this.activate(this.activeIndex-1);
    }
  }

  /**
   * 下一张
   */
  next() {
    if (this.activeIndex < this.images.length - 1) {
      this.activate(this.activeIndex+1);
    }
  }

  /**
   * 激活指定图片到当前窗口
   * @param index
   */
  activate(index: number) {
    this.activeIndex = index;
    this.change.emit(this.activeIndex);
  }

  /**
   * 获取鼠标位置
   * @param e
   * @returns {{left: number, top: number}}
   */
  private getMousePosition(e: MouseEvent): {left: number,top: number} {
    var m_x = e.pageX || (e.clientX +
      (document.documentElement.scrollLeft
      || document.body.scrollLeft));
    var m_y = e.pageY || (e.clientY +
      (document.documentElement.scrollTop
      || document.body.scrollTop));
    return {left: m_x, top: m_y};
  }


  /**
   * 显示/隐藏工具
   * @param ev
   */
  toggleShowTools(ev:Event){
    ev.stopPropagation();
    this.isShowTools=!this.isShowTools;
  }
}
