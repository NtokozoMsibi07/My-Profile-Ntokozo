import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { AboutAnimationService } from '../../../services/about-animation';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit {
  constructor(private el: ElementRef, private aboutAnim: AboutAnimationService) {}

  ngAfterViewInit(): void {
    const section = this.el.nativeElement.querySelector('#about');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('show-line');
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
  }

  ngOnInit(): void {
    this.aboutAnim.trigger$.subscribe(() => {
      this.replayAnimation();
    });
  }

  replayAnimation(): void {
    const section = this.el.nativeElement.querySelector('#about');

    section.classList.remove('show-line');
    void section.offsetWidth;
    section.classList.add('show-line');
  }
}
