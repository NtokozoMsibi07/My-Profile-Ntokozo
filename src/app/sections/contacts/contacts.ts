import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.css'],
})
export class Contacts implements AfterViewInit {
  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    // Get the contacts section
    const section = this.elRef.nativeElement.querySelector('#contacts');

    if (section) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            section.classList.add('show-line');
            observer.unobserve(section);
          }
        },
        { threshold: 0.3 },
      );

      observer.observe(section);
    }
  }
}
