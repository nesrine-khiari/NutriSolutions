import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-box',
  templateUrl: './svg-box.component.html',
  styleUrls: ['./svg-box.component.css'],
})
export class SvgBoxComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('svgContainer', { static: false }) svgContainer!: ElementRef;
  @Input() width: string = 'auto';
  @Input() height: string = 'auto';
  actualWidth: number = 0;
  actualHeight: number = 0;
  backgroundStyle: SafeStyle = '';
  private resizeObserver!: ResizeObserver;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.observeContainerSize();
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  observeContainerSize(): void {
    const container = this.svgContainer.nativeElement;
    this.updateDimensions();

    // Initialize the ResizeObserver
    this.resizeObserver = new ResizeObserver(() => {
      this.updateDimensions();
      this.generateSVGBackground();
    });

    // Start observing the container
    this.resizeObserver.observe(container);
  }

  updateDimensions(): void {
    const container = this.svgContainer.nativeElement;
    this.actualWidth = container.offsetWidth || 200;
    this.actualHeight = container.offsetHeight || 200;
  }

  generateSVGBackground(): void {
    const svgElement = `
      <svg
        viewBox="0 0 ${this.actualWidth} ${this.actualHeight}"
        width="${this.actualWidth}"
        height="${this.actualHeight}"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color: #9dc209; stop-opacity: 1" />
            <stop offset="52%" style="stop-color: #cc5500; stop-opacity: 1" />
          </linearGradient>
        </defs>

        <path
          d="${this.getPathD()}"
          fill="transparent"
          stroke="url(#gradientStroke)"
          stroke-width="2"
        />
      </svg>
    `;
    const encodedSVG = encodeURIComponent(svgElement);
    const dataURL = `url('data:image/svg+xml,${encodedSVG}')`;

    // Sanitize the URL to safely bind it in the template
    this.backgroundStyle = this.sanitizer.bypassSecurityTrustStyle(dataURL);
  }

  getPathD(): string {
    const w = this.actualWidth || 200; // Fallback to default value
    const h = this.actualHeight || 200;

    return `
      M 0,${0.1 * h}
      Q 0,0 ${0.1 * w},0
      Q ${0.5 * w},${0.05 * h} ${0.9 * w},0
      Q ${w},0 ${w},${0.1 * h}
      L ${w},${0.9 * h}
      Q ${w},${h} ${0.9 * w},${h}
      L ${0.1 * w},${h}
      Q 0,${h} 0,${0.9 * h}
      L 0,${0.1 * h}
      Z
    `;
  }
}
