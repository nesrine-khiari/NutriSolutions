import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string = '';
  @Input() type: string = 'submit';
  @Input() width: string = '100%';
  @Input() fontWeight: string = 'bold';
  @Input() backgroundColor: string = '';
  @Input() textColor: string = 'white';
  @Input() boxShadow: string = '';
  @Input() borderRadius: string = '8px';

  isHovered: boolean = false;

  ngOnInit(): void {
    // Set default colors using CSS variables if not explicitly provided
    this.backgroundColor =
      this.backgroundColor || this.getCssVariable('--secondary-color');
    this.boxShadow =
      this.boxShadow || `0 4px 8px 2px ${this.getCssVariable('--light-green')}`;
  }

  private getCssVariable(variableName: string): string {
    // Fetch the root element's styles
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  }

  getStyles() {
    return {
      width: this.width,
      type: this.type,
      fontWeight: this.fontWeight,
      color: this.textColor,
      boxShadow: this.isHovered ? this.boxShadow : 'none',
      backgroundColor: this.backgroundColor,
      borderRadius: this.borderRadius,
    };
  }
}
