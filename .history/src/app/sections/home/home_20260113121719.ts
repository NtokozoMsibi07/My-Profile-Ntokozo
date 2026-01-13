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
  underlinePosition = 0;
  underlineWidth = 0;
  isScrolled = false;

  readonly sections = ['home', 'about', 'projects', 'contacts'];

  @ViewChildren('navLink', { read: ElementRef })
  navLinks!: QueryList<ElementRef>;

  // ✅ Single source of truth for scroll state
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateScrollState();
    this.updateActiveSection();
  }

  ngAfterViewInit() {
    // ✅ Ensure correct state on refresh
    setTimeout(() => {
      this.updateScrollState();
      this.updateActiveSection();
      this.updateUnderline();
    }, 0);
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

    const headerOffset = 90; // match header height
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
