import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../shared/material/material.module';

@Component({
  selector: 'app-call-to-action',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.css',
})
export class CtaComponent {}
