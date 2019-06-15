import { Component } from '@angular/core';
import { Options,LabelType ,PointerType,ChangeContext  } from 'ng5-slider';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  minValue: number = 30;
  maxValue: number = 70;
  logText: string = '';
  floor=10;
  ceil=100;


  step=5;
  options: Options = {
    floor:this. floor,
    ceil: this.ceil,
    step:this.step,
    showTicks:true,
    tickStep:5,
    
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return `$${value}k`;
        case LabelType.High:
          return `$${value}k`;
        default:
          return `$${value}k`;
      }
  },
  
  
  
  
}

  setnewFloorCeil(newCeil: number,newFloor: number): void {
    // Due to change detection rules in Angular, we need to re-create the options object to apply the change
    const newOptions: Options = Object.assign({}, this.options);
    newOptions.ceil = newCeil;
     newOptions.floor = newFloor;
    this.options = newOptions;
  }

  
  setnewFloor(newFloor: number): void {
    // Due to change detection rules in Angular, we need to re-create the options object to apply the change
    const newOptions: Options = Object.assign({}, this.options);
    newOptions.floor = newFloor;
    this.options = newOptions;
  }


 onUserChangeStart(changeContext: ChangeContext): void { 
   
    this.logText += `onUserChangeStart(${this.getChangeContextString(changeContext)})\n`;
  }

  onUserChange(changeContext: ChangeContext): void {
    debugger
     if(changeContext.pointerType==0){ 
       //min change
        if(changeContext.value==this.floor && this.floor!=0){
          // check if its min value and not equal zero
          this.floor-=this.step;
          this.ceil-=this.step;
          this.maxValue-=this.step;
          this.setnewFloorCeil(this.ceil,this.floor); 

        } 
     }
     else if(changeContext.pointerType==1){
       // max change
       
          this.ceil+=this.step;
         
          if(this.minValue!=this.floor){
             this.floor+=this.step;

          }
          this.minValue+=this.step; 
          this.setnewFloorCeil(this.ceil,this.floor);
     }
    // this.logText += `onUserChange(${this.getChangeContextString(changeContext)})\n`;
  }

  onUserChangeEnd(changeContext: ChangeContext): void {
    this.logText += `onUserChangeEnd(${this.getChangeContextString(changeContext)})\n`;
  } 

  getChangeContextString(changeContext: ChangeContext): string {
    return `{pointerType: ${changeContext.pointerType === PointerType.Min ? 'Min' : 'Max'}, ` +
           `value: ${changeContext.value}, ` +
           `highValue: ${changeContext.highValue}}`;
  }
}


