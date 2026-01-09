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
import { AboutAnimationService } from '../../../services/about-animation';

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

  constructor(private aboutAnim: AboutAnimationService) {}

  sections = ['home', 'about', 'projects', 'contacts'];

  // Track scroll to update activeSection
  @HostListener('window:scroll', [])
  onScroll() {
    for (const section of this.sections) {
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom > 150) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  @ViewChildren('navLink', { read: ElementRef }) navLinks!: QueryList<ElementRef>;

  ngAfterViewInit() {
    setTimeout(() => this.updateUnderline(), 0);
  }

  scrollTo(section: string) {
    this.activeSection = section;
    this.updateUnderline();

    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  updateUnderline() {
    const linksArray = this.navLinks.toArray();
    const sections = ['home', 'about', 'projects', 'contacts'];
    const activeIndex = sections.indexOf(this.activeSection);
    if (linksArray[activeIndex]) {
      const el = linksArray[activeIndex].nativeElement as HTMLElement;
      this.underlinePosition = el.offsetLeft;
      this.underlineWidth = el.offsetWidth;
    }
  }

  goToAbout() {
    this.aboutAnim.triggerAnimation();
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }
}
