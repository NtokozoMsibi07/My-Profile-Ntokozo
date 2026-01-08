import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
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
  imagePath: string = 'assets/my_image.jpg';
  underlinePosition: number = 0;
  underlineWidth: number = 0;

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
}
