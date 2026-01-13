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
    // Prevent browser restoring scroll position on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    console.log('[constructor] scrollY:', window.scrollY);
  }

  ngOnInit() {
    console.log('[ngOnInit] BEFORE scrollTo, scrollY:', window.scrollY);

    // Force top position on refresh
    window.scrollTo({ top: 0, behavior: 'auto' });

    console.log('[ngOnInit] AFTER scrollTo, scrollY:', window.scrollY);

    this.isScrolled = false;
    this.activeSection = 'home';

    console.log('[ngOnInit] isScrolled:', this.isScrolled);
  }

  ngAfterViewInit() {
    // Delay to ensure DOM and layout settle
    setTimeout(() => {
      console.log('[ngAfterViewInit -> timeout] scrollY:', window.scrollY);

      // Force top scroll again if browser restored scroll
      window.scrollTo({ top: 0, behavior: 'auto' });

      this.updateScrollState();
      this.updateActiveSection();
      this.updateUnderline();

      console.log('[ngAfterViewInit -> timeout] isScrolled:', this.isScrolled);
      console.log('[ngAfterViewInit -> timeout] activeSection:', this.activeSection);
    }, 50); // slight delay ensures layout and images loaded
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    console.log('[scroll] scrollY:', window.scrollY);

    this.updateScrollState();
    this.updateActiveSection();

    console.log('[scroll] isScrolled:', this.isScrolled);
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
    console.log('[click] section:', section);
    console.log('[click] BEFORE scrollY:', window.scrollY);

    const el = document.getElementById(section);
    if (!el) {
      console.log('[click] element NOT found');
      return;
    }

    this.activeSection = section;
    this.updateUnderline();

    // Header height changes dynamically (py-6 -> py-2)
    const headerOffset = this.isScrolled ? 72 : 104;

    const elementPosition = el.getBoundingClientRect().top + window.scrollY;

    const offsetPosition = elementPosition - headerOffset;

    console.log('[click] headerOffset:', headerOffset);
    console.log('[click] offsetPosition:', offsetPosition);

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
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
