import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project } from '../../types/project.interface';

export type ProjectCardSize = 'xlarge' | 'large' | 'medium' | 'small';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article
      class="card"
      [class.card--xlarge]="size === 'xlarge'"
      [class.card--large]="size === 'large'"
      [class.card--medium]="size === 'medium'"
      [class.card--small]="size === 'small'"
      [routerLink]="['/projects', project.documentId]"
    >
      <!-- Image Section -->
      <div
        class="card__image-wrapper"
        *ngIf="size !== 'small' && project.cover?.url"
      >
        <img
          [src]="'https://grant-api.tobybabin.site' + project.cover.url"
          [alt]="project.title || 'Project Image'"
          class="card__image"
        />
      </div>

      <!-- Content Section -->
      <div
        class="card__content"
        [class.card__content--small]="size === 'small'"
      >
        <span class="card__category">{{
          project.category || 'Uncategorized'
        }}</span>
        <h3 class="card__title">{{ project.title || 'Untitled Project' }}</h3>
        <p
          class="card__description"
          *ngIf="project.description && (size === 'xlarge' || size === 'large')"
        >
          {{ project.description }}
        </p>
      </div>
    </article>
  `,
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  @Input() size: ProjectCardSize = 'medium';
  @Input({ required: true }) project!: Project;
}
