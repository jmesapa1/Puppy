import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[guionesOnly]'
})
export class GuionesOnlyDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event:any) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value=initalValue.replace(/[^A-Za-z0-9-]*/g, '');


    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
