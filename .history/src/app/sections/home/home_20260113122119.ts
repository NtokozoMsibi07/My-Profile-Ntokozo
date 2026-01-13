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
    // ✅ PREVENT browser restoring scroll on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }

  // ✅ RUNS BEFORE VIEW RENDERS
  ngOnInit() {
    // Always start at top on refresh
    window.scrollTo({ top: 0, behavior: 'auto' });
    this.isScrolled = false;
    this.activeSection = 'home';
  }

  // ✅ RUNS AFTER DOM IS READY
  ngAfterViewInit() {
    setTimeout(() => {
      this.updateScrollState();
      this.updateActiveSection();
      this.updateUnderline();
    }, 0);
  }

  // ---------- SCROLL LISTENER ----------
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateScrollState();
    this.updateActiveSection();
  }

  // ---------- SCROLL STATE ----------
  private updateScrollState() {
    this.isScrolled = window.scrollY > 50;
  }

  // ---------- ACTIVE SECTION ----------
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

  // ---------- NAV CLICK ----------
  scrollTo(section: string) {
    const el = document.getElementById(section);
    if (!el) return;

    this.activeSection = section;
    this.updateUnderline();

    // Header height changes (py-6 -> py-2), so offset must adapt
    const headerOffset = this.isScrolled ? 72 : 104;

    const elementPosition = el.getBoundingClientRect().top + window.scrollY;

    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }

  // ---------- UNDERLINE ----------
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
