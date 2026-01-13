import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
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
export class Home implements AfterViewInit {
  activeSection: string = 'home';
  underlinePosition: number = 0;
  underlineWidth: number = 0;
  isScrolled = false;

  sections = ['home', 'about', 'projects', 'contacts'];

  // Track nav links
  @ViewChildren('navLink', { read: ElementRef }) navLinks!: QueryList<ElementRef>;

  ngAfterViewInit() {
    // Initialize underline after view loads
    setTimeout(() => this.updateUnderline(), 0);

    // Set initial header state based on scroll position
    this.isScrolled = window.scrollY > 50;

    // Update active section and underline on load if page is already scrolled
    this.updateActiveSection();
  }

  // Scroll listener
  @HostListener('window:scroll', [])
  onScroll() {
    this.isScrolled = window.scrollY > 50; // Shrink header if scrolled
    this.updateActiveSection();
  }

  // Scroll smoothly to a section when clicking nav link
  scrollTo(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Update which section is active based on scroll
  private updateActiveSection() {
    for (const section of this.sections) {
      const el = document.getElementById(section);
      if (el) {
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
  }

  // Update underline position and width
  private updateUnderline() {
    if (!this.navLinks || this.navLinks.length === 0) return;

    const linksArray = this.navLinks.toArray();
    const activeIndex = this.sections.indexOf(this.activeSection);

    if (linksArray[activeIndex]) {
      const el = linksArray[activeIndex].nativeElement as HTMLElement;
      this.underlinePosition = el.offsetLeft;
      this.underlineWidth = el.offsetWidth;
    }
  }
}
