import { Directive, HostListener, HostBinding, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

  element
  isOpen
  @HostListener('click') toggleOpen() {
    if (!this.isOpen) {
      this.renderer.addClass(this.element, 'show')
    }
    else {
      this.renderer.removeClass(this.element, 'show')
    }

    this.isOpen = !this.isOpen
  }
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.isOpen = false
    this.element = this.elRef.nativeElement.querySelector('.dropdown-menu')
    // this.toggleOpen()
  }

}
