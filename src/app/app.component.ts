import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import {
  faGlobe,
  faCode,
  faBrain,
  faLightbulb,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCanadianMapleLeaf,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { StrapiService } from './services/strapi.service';
import { Project } from './types/project.interface';
import { ProjectCardComponent } from './components/project-card/project-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FontAwesomeModule,
    CommonModule,
    MarkdownModule,
    ProjectCardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'anatolii-portfolio';
  name = 'Anatolii Babin';
  projects: Project[] = [];
  loading = true;
  error: string | null = null;

  // Font Awesome icons
  faGlobe = faGlobe;
  faMapleLeaf = faCanadianMapleLeaf;
  faCode = faCode;
  faBrain = faBrain;
  faLightbulb = faLightbulb;
  faGithub = faGithub;
  faExternalLinkAlt = faExternalLinkAlt;

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
