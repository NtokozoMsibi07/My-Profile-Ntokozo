import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
})
export class Projects implements AfterViewInit {
  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    const section = this.elRef.nativeElement.querySelector('#projects');

    if (section) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            section.classList.add('show-line');
            observer.unobserve(section);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(section);
    }
  }
}
