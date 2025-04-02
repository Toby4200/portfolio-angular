import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
  ],
  template: `
    <app-header [name]="name" />
    <router-outlet />
    <app-footer />
  `,
  styles: [``],
})
export class LayoutComponent {
  @Input() name = 'Anatolii Babin';
}
