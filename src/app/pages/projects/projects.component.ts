import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { StrapiService } from '../../services/strapi.service';
import { Project } from '../../types/project.interface';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  template: `
    <div class="projects-container">
      <h1 class="projects-title">My Projects</h1>

      <div *ngIf="loading" class="loading">Loading projects...</div>

      <div *ngIf="error" class="error">
        {{ error }}
      </div>

      <div class="projects-grid" *ngIf="!loading && !error">
        <ng-container *ngFor="let project of projects">
          <app-project-card
            size="large"
            [project]="project"
            class="card-wrapper"
          ></app-project-card>
        </ng-container>
      </div>
    </div>
  `,
  styles: [
    `
      .projects-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 2rem;
      }

      .projects-title {
        font-size: 2.5rem;
        color: var(--gray-900);
        margin-bottom: 2rem;
        text-align: center;
      }

      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
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
        .projects-container {
          padding: 1rem;
        }

        .projects-title {
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

        .projects-grid {
          gap: 1rem;
        }
      }
    `,
  ],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  loading = true;
  error: string | null = null;

  constructor(private strapiService: StrapiService) {}

  ngOnInit() {
    this.loadProjects();
  }

  private loadProjects() {
    this.strapiService.getProjects().subscribe({
      next: (response) => {
        this.projects = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load projects. Please try again later.';
        this.loading = false;
      },
    });
  }
}
