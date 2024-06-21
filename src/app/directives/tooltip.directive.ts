import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input('appTooltip')
  tooltipText!: string;
  
  private tooltipElement!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipElement, 'tooltip');
    this.renderer.appendChild(this.tooltipElement, this.renderer.createText(this.tooltipText));
    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
    this.renderer.setStyle(this.tooltipElement, 'visibility', 'hidden');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.tooltipElement, 'visibility', 'visible');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.tooltipElement, 'visibility', 'hidden');
  }
}
