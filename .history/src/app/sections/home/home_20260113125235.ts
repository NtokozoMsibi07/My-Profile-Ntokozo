import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit, AfterViewInit {
  activeSection: string = 'home';
  underlinePosition = 0;
  underlineWidth = 0;
  isScrolled = false;

  readonly sections = ['home', 'about', 'projects', 'contacts'];

  @ViewChildren('navLink', { read: ElementRef })
  navLinks!: QueryList<ElementRef>;

  constructor() {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }

  ngOnInit() {
    // Force scroll to top on init
    window.scrollTo({ top: 0, behavior: 'auto' });
    this.isScrolled = false;
    this.activeSection = 'home';
  }

  ngAfterViewInit() {
    // Wait until DOM and CSS layout are fully ready
    requestAnimationFrame(() => {
      this.updateScrollState();
      this.updateActiveSection();
      this.updateUnderline();
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateScrollState();
    this.updateActiveSection();
  }

  private updateScrollState() {
    this.isScrolled = window.scrollY > 50;
  }

  private updateActiveSection() {
    for (const section of this.sections) {
      const el = document.getElementById(section);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom > 150) {
        if (this.activeSection !== section) {
          this.activeSection = section;
          this.updateUnderline();
        }
        break;
      }
    }
  }

  scrollTo(section: string) {
    const el = document.getElementById(section);
    if (!el) return;

    this.activeSection = section;
    this.updateUnderline();

    // Wait until layout/CSS fully applied before reading header height
    requestAnimationFrame(() => {
      const header = document.querySelector('header');
      const headerHeight = header ? header.clientHeight : 100;

      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - 8; // small extra spacing

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    });
  }

  private updateUnderline() {
    const links = this.navLinks.toArray();
    const index = this.sections.indexOf(this.activeSection);

    if (links[index]) {
      const el = links[index].nativeElement as HTMLElement;
      this.underlinePosition = el.offsetLeft;
      this.underlineWidth = el.offsetWidth;
    }
  }
}
