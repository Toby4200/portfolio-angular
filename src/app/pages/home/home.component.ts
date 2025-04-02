import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { StrapiService } from '../../services/strapi.service';
import { Project } from '../../types/project.interface';
import * as EmojiToolkit from 'emoji-toolkit';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  template: `
    <main class="main">
      <div class="slogans">
        <h1 class="slogan">
          Hello, Calgary
          <span class="icon maple-leaf-icon" [innerHTML]="canadaEmoji"></span>
        </h1>

        <h1 class="slogan">
          I'm fullstack engineer
          <span class="icon code-icon" [innerHTML]="computerEmoji"></span> and
          technical manager
        </h1>

        <h1 class="slogan">
          My passion is to build systems
          <span class="icon brain-icon" [innerHTML]="brainEmoji"></span>
          Connecting People, ideas and Technology
        </h1>

        <h1 class="slogan">
          My strength is to
          <span class="icon bulb-icon" [innerHTML]="bulbEmoji"></span>
          Illuminate what truly matters and Hack Growth
        </h1>
      </div>

      <div class="projects-section">
        <div *ngIf="loading" class="loading">Loading projects...</div>

        <div *ngIf="error" class="error">
          {{ error }}
        </div>

        <div class="projects-grid">
          <app-project-card
            *ngFor="let project of projects"
            size="xlarge"
            [project]="project"
            class="card-wrapper"
          ></app-project-card>
        </div>
      </div>
    </main>
  `,
  styles: [
    `
      .main {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .slogans {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 4rem;
        max-width: 800px;
        margin: 0 auto;
        padding-top: 4rem;
        padding-inline: 2rem;
        min-height: 75vh;
      }

      .slogans h1 {
        font-size: 2.5rem;
        font-weight: 600;
        line-height: 1.3;
        margin: 0;
        opacity: 0.85;
        transition: opacity 0.3s ease;
      }

      .slogans h1:hover {
        opacity: 1;
      }

      .slogan {
        align-items: center;
        gap: 0.5rem;
        text-overflow: ellipsis;
      }

      .icon {
        font-size: 1.8rem;
        transition: transform 0.3s ease;
        display: inline-flex;
        align-items: center;
        margin: 0.3rem;
      }

      .slogan:hover .icon {
        transform: scale(1.2);
      }

      .code-icon {
        color: var(--electric-violet);
      }

      .brain-icon {
        color: var(--french-violet);
      }

      .bulb-icon {
        color: var(--vivid-pink);
      }

      .maple-leaf-icon {
        color: #ff0000;
      }

      @media screen and (max-width: 650px) {
        .slogans {
          padding-top: 2rem;
          padding-inline: 1rem;
          gap: 3rem;
          min-height: 90vh;
        }

        .slogans h1 {
          font-size: 1.5rem;
        }

        .icon {
          font-size: 1.3rem;
        }
      }

      .projects-section {
        max-width: 1400px;
        margin: 0 auto;
        padding: 4rem 2rem;
        // background: linear-gradient(
        //   180deg,
        //   transparent,
        //   var(--gray-400) 15%,
        //   white 30%
        // );
      }

      .projects-section h2 {
        font-size: 2.5rem;
        color: var(--gray-900);
        margin-bottom: 2rem;
        text-align: center;
      }

      .projects-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        grid-auto-rows: 150px;
      }

      .card-wrapper {
        display: contents;
      }

      .project-card {
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        background: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
      }

      .project-card.featured {
        grid-column: span 2;
        grid-row: span 3;
      }

      .project-card.medium {
        grid-row: span 3;
      }

      .project-card.small {
        grid-row: span 1;
      }

      .project-card:hover {
        transform: translateY(-5px);
      }

      .project-category {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: rgba(255, 255, 255, 0.9);
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--gray-900);
        z-index: 2;
      }

      .project-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .project-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1.5rem;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
        color: white;
      }

      .project-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
      }

      .project-card.featured .project-title {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }

      .project-card.medium .project-title {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
      }

      .project-description {
        font-size: 0.875rem;
        margin: 0;
        opacity: 0.9;
        display: none;
      }

      .project-card.featured .project-description,
      .project-card.medium .project-description {
        display: block;
      }

      .technologies {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }

      .tech-tag {
        background: color-mix(in srgb, var(--bright-blue) 10%, transparent);
        color: var(--bright-blue);
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.875rem;
      }

      .project-links {
        display: flex;
        gap: 1rem;
      }

      .project-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--gray-900);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s ease;
      }

      .project-link:hover {
        color: var(--electric-violet);
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

      @media screen and (max-width: 1200px) {
        .projects-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
      }

      @media screen and (max-width: 768px) {
        .projects-section {
          padding: 0 1rem;
          margin: 2rem auto;
        }

        .projects-grid {
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .projects-section h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }
      }

      .markdown-content {
        color: var(--gray-700);
        line-height: 1.6;
      }

      .markdown-content h1,
      .markdown-content h2,
      .markdown-content h3,
      .markdown-content h4,
      .markdown-content h5,
      .markdown-content h6 {
        color: var(--gray-900);
        margin: 1.5rem 0 1rem;
        line-height: 1.3;
      }

      .markdown-content h1 {
        font-size: 2rem;
      }
      .markdown-content h2 {
        font-size: 1.75rem;
      }
      .markdown-content h3 {
        font-size: 1.5rem;
      }

      .markdown-content p {
        margin-bottom: 1rem;
      }

      .markdown-content img {
        max-width: 100%;
        height: auto;
        border-radius: 0.5rem;
        margin: 1rem 0;
      }

      .markdown-content ul,
      .markdown-content ol {
        margin: 1rem 0;
        padding-left: 2rem;
      }

      .markdown-content li {
        margin-bottom: 0.5rem;
      }

      .markdown-content a {
        color: var(--electric-violet);
        text-decoration: none;
        transition: color 0.3s ease;
      }

      .markdown-content a:hover {
        color: var(--french-violet);
      }

      .markdown-content blockquote {
        border-left: 4px solid var(--bright-blue);
        margin: 1rem 0;
        padding-left: 1rem;
        color: var(--gray-700);
        font-style: italic;
      }

      .markdown-content code {
        background: color-mix(in srgb, var(--bright-blue) 10%, transparent);
        padding: 0.2rem 0.4rem;
        border-radius: 0.25rem;
        font-family: monospace;
      }

      .markdown-content pre {
        background: var(--gray-900);
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        overflow-x: auto;
        margin: 1rem 0;
      }

      .markdown-content pre code {
        background: none;
        padding: 0;
        color: inherit;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];
  loading = true;
  error: string | null = null;

  // Emoji definitions using emoji-toolkit
  canadaEmoji =
    EmojiToolkit.shortnameToImage(':flag_ca:') +
    '&nbsp;' +
    EmojiToolkit.shortnameToImage(':maple_leaf:');
  computerEmoji = EmojiToolkit.shortnameToImage(':computer:');
  brainEmoji = EmojiToolkit.shortnameToImage(':brain:');
  bulbEmoji = EmojiToolkit.shortnameToImage(':bulb:');

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
