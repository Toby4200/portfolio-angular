import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProjectCardSize = 'xlarge' | 'large' | 'medium' | 'small';

export interface ProjectCardData {
  title: string;
  description?: string;
  category: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article
      class="card"
      [class.card--xlarge]="size === 'xlarge'"
      [class.card--large]="size === 'large'"
      [class.card--medium]="size === 'medium'"
      [class.card--small]="size === 'small'"
    >
      <!-- Image Section -->
      <div
        class="card__image-wrapper"
        *ngIf="size !== 'small' && data.imageUrl"
      >
        <img [src]="data.imageUrl" [alt]="data.title" class="card__image" />
      </div>

      <!-- Content Section -->
      <div
        class="card__content"
        [class.card__content--small]="size === 'small'"
      >
        <span class="card__category">{{ data.category }}</span>
        <h3 class="card__title">{{ data.title }}</h3>
        <p
          class="card__description"
          *ngIf="data.description && (size === 'xlarge' || size === 'large')"
        >
          {{ data.description }}
        </p>
      </div>
    </article>
  `,
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  @Input() size: ProjectCardSize = 'medium';
  @Input({ required: true }) data!: ProjectCardData;
}
