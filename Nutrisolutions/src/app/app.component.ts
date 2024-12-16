import { Component, AfterViewInit } from '@angular/core';

// Extend HTMLDivElement to include `x` and `y` properties
interface CustomHTMLDivElement extends HTMLDivElement {
  x: number;
  y: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  coords = { x: 0, y: 0 };
  colors: string[] = [
    "#cc5500", "#cc5500", "#cc5500", "#cc5500",
    "#c05200", "#c05200", "#c05200", "#c05200",
    "#b44e00", "#b44e00", "#a84b00", "#a84b00",
    "#9d4700", "#9d4700", "#924400", "#924400",
    "#874000", "#874000", "#7c3c00",
  ];

  ngAfterViewInit(): void {
    const circles = document.querySelectorAll<CustomHTMLDivElement>('.circle');

    circles.forEach((circle, index) => {
      circle.x = 0; // Initialize the `x` property
      circle.y = 0; // Initialize the `y` property
      circle.style.backgroundColor = this.colors[index % this.colors.length];
    });

    window.addEventListener('mousemove', (e: MouseEvent) => {
      this.coords.x = e.clientX;
      this.coords.y = e.clientY;
    });

    const animateCircles = () => {
      let x = this.coords.x;
      let y = this.coords.y;

      circles.forEach((circle, index) => {
        circle.style.left = `${x - 12}px`;
        circle.style.top = `${y - 12}px`;

        // Scale the circle based on its index
        circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

        circle.x = x; // Update the `x` property
        circle.y = y; // Update the `y` property

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
      });

      requestAnimationFrame(animateCircles);
    };

    animateCircles();
 
  }

}

