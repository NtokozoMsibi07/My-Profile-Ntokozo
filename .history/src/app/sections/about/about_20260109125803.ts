import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit {
  constructor(private el: ElementRef) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    const section = this.el.nativeElement.querySelector('#about');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('show-line');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
  }
}
