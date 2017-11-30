import { Component,Input,Output,OnInit,ElementRef,EventEmitter,AfterViewInit} from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'thirth-nav-item',
  templateUrl: './thirth-nav-item.component.html',
  styleUrls: ['./thirth-nav-item.component.less']
})
export class ThirthNavItemComponent {
  @Input() text:string;
  @Input() link:string;
  constructor(
    private elemRef:ElementRef,
    private router:Router
  ){
    this.elemRef.nativeElement.addEventListener('click',(ev)=>{
      ev.stopPropagation();
    });
  }

  isActive(){
    let active=false;
    if (this.link) {
      active = this.router.isActive(this.link, false);
    } else {
      active = false;
    }
    return active;
  }

}
