import { Component, Input, OnInit } from '@angular/core';
import { AppUtils } from 'src/app/core/utils/functions.utils';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string = '';
  @Input() type: string = 'button';
  @Input() width: string = '100%';
  @Input() fontWeight: string = 'bold';
  @Input() backgroundColor: string = '';
  @Input() textColor: string = 'white';
  @Input() boxShadow: string = '';
  @Input() borderRadius: string = '8px';
  @Input() disabled: boolean = false;
  @Input() hasBorder: boolean = false;
  @Input() onClick: () => void = () => {};

  isHovered: boolean = false;

  ngOnInit(): void {
    // Set default colors using CSS variables if not explicitly provided
    this.backgroundColor =
      this.backgroundColor || AppUtils.getCssVariable('--secondary-color');
    this.boxShadow =
      this.boxShadow ||
      `0 4px 8px 2px ${AppUtils.getCssVariable('--light-green')}`;
  }

  getStyles() {
    return {
      width: this.width,
      disabled: this.disabled,
      type: this.type,
      fontWeight: this.fontWeight,
      color: this.textColor,
      boxShadow: this.isHovered ? this.boxShadow : 'none',
      backgroundColor: this.backgroundColor,
      borderRadius: this.borderRadius,
      border: this.hasBorder
        ? `1px solid ${AppUtils.getCssVariable('--secondary-color')}`
        : 'none',
    };
  }
}
