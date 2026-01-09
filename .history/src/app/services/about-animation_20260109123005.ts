import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AboutAnimationService {
  private triggerSource = new Subject<void>();
  trigger$ = this.triggerSource.asObservable();

  triggerAnimation() {
    this.triggerSource.next();
  }
}
