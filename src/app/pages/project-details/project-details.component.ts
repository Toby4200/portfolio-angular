import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { StrapiService } from '../../services/strapi.service';
import { Project } from '../../types/project.interface';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  template: `
    <div class="project-details-container">
      <div *ngIf="loading" class="loading">Loading project details...</div>

      <div *ngIf="error" class="error">
        {{ error }}
      </div>

      <div *ngIf="project && !loading" class="project-content">
        <div class="project-header">
          <span class="project-category">{{
            project.category || 'Uncategorized'
          }}</span>
          <h1 class="project-title">
            {{ project.title || 'Untitled Project' }}
          </h1>
        </div>

        <img
          *ngIf="project.cover?.url"
          [src]="'https://grant-api.tobybabin.site' + project.cover.url"
          [alt]="project.title || 'Project Image'"
          class="project-cover"
        />

        <div class="project-description">
          <markdown
            [data]="project.content_md || 'No content available.'"
          ></markdown>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .project-details-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }

      .project-header {
        margin-bottom: 2rem;
        text-align: center;
      }

      .project-category {
        display: inline-block;
        background: var(--bright-blue);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 1rem;
      }

      .project-title {
        font-size: 3rem;
        color: var(--gray-900);
        margin: 0;
        line-height: 1.2;
      }

      .project-cover {
        width: 100%;
        max-height: 500px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 2rem;
      }

      .project-description {
        color: var(--gray-700);
        line-height: 1.6;
      }

      .project-description ::ng-deep img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 1rem 0;
      }

      .loading,
      .error {
        text-align: center;
        padding: 2rem;
        font-size: 1.25rem;
        color: var(--gray-700);
      }

      .error {
        color: var(--hot-red);
      }

      @media screen and (max-width: 768px) {
        .project-details-container {
          padding: 1rem;
        }

        .project-title {
          font-size: 2rem;
        }
      }
    `,
  ],
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private strapiService: StrapiService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProject(id);
    } else {
      this.error = 'Project not found';
      this.loading = false;
    }
  }

  private loadProject(id: string) {
    this.strapiService.getProject(id).subscribe({
      next: (response) => {
        this.project = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load project details. Please try again later.';
        this.loading = false;
      },
    });
  }
}
