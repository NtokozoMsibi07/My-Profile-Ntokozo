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
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    console.log('[constructor] scrollY:', window.scrollY);
  }

  ngOnInit() {
    console.log('[ngOnInit] BEFORE scrollTo, scrollY:', window.scrollY);
    window.scrollTo({ top: 0, behavior: 'auto' });
    this.isScrolled = false;
    this.activeSection = 'home';
    console.log('[ngOnInit] AFTER scrollTo, isScrolled:', this.isScrolled);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log('[ngAfterViewInit -> timeout] scrollY:', window.scrollY);
      window.scrollTo({ top: 0, behavior: 'auto' });
      this.updateScrollState();
      this.updateActiveSection();
      this.updateUnderline();
      console.log(
        '[ngAfterViewInit -> timeout] isScrolled:',
        this.isScrolled,
        'activeSection:',
        this.activeSection
      );
    }, 50);
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
    console.log('[click] section:', section, 'BEFORE scrollY:', window.scrollY);

    const el = document.getElementById(section);
    if (!el) {
      console.log('[click] element NOT found');
      return;
    }

    this.activeSection = section;
    this.updateUnderline();

    // ✅ Dynamically calculate header height
    const header = document.querySelector('header');
    const headerHeight = header ? header.clientHeight : 100;

    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerHeight;

    console.log('[click] headerHeight:', headerHeight, 'offsetPosition:', offsetPosition);

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
