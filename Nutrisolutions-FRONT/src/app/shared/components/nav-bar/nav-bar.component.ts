import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements AfterViewInit {
  @ViewChild('toggle') toggle!: ElementRef;
  @ViewChild('itemsTitles') itemsTitles!: ElementRef;
  @ViewChild('navBar') navBar!: ElementRef;
  @ViewChild('itemsIcons') itemsIcons!: ElementRef;
  @ViewChild('logo') logo!: ElementRef;
  @ViewChild('logout') logout!: ElementRef;
  menuItems = [
    { title: 'Acceuil', iconClass: 'fas fa-home' },
    { title: 'Profile', iconClass: 'fas fa-user' },
    { title: 'Recettes', iconClass: 'fas fa-utensils' },
    { title: 'Nutritionnistes', iconClass: 'fas fa-user-md' },
    { title: 'Messenger', iconClass: 'fab fa-facebook-messenger' },
    { title: 'Gallery', iconClass: 'fas fa-image' },
    { title: 'Analytics', iconClass: 'fas fa-chart-line' },
    { title: 'Settings', iconClass: 'fas fa-cog' },
  ];

  selectedItem: number | null = null;
  isHovered: boolean = false;

  selectItem(index: number): void {
    this.selectedItem = index;
  }

  ngAfterViewInit(): void {
    this.toggle.nativeElement.addEventListener('click', this.onToggleClick.bind(this));
  }
  
  onToggleClick(): void {
    this.itemsTitles.nativeElement.classList.toggle('active');
    this.navBar.nativeElement.classList.toggle('active');
    this.itemsIcons.nativeElement.classList.toggle('active');
    this.logo.nativeElement.classList.toggle('active');
    this.logout.nativeElement.classList.toggle('active');
    this.toggle.nativeElement.classList.toggle('active');
  }
}