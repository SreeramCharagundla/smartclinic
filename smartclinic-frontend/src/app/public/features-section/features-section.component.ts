import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { MaterialModule } from '../../shared/material/material.module';

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.css',
})
export class FeaturesSectionComponent {
  readonly cols = toSignal(
    this.breakpointObserver
      .observe(['(max-width: 767px)', '(max-width: 1023px)'])
      .pipe(
        map((state) => {
          if (state.breakpoints['(max-width: 767px)']) {
            return 1;
          }
          if (state.breakpoints['(max-width: 1023px)']) {
            return 2;
          }
          return 4;
        }),
      ),
    { initialValue: 4 },
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
