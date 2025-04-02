import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="copyright">© Anatolii Babin {{ currentYear }}</div>
        <div class="social-links">
          <a
            href="https://www.linkedin.com/in/anatolii-babin/"
            target="_blank"
            rel="noopener noreferrer"
            >LinkedIn</a
          >
          <a
            href="https://github.com/Toby4200"
            target="_blank"
            rel="noopener noreferrer"
            >GitHub</a
          >
          <a href="mailto:ababin464@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        background: var(--gray-900);
        color: white;
        padding: 1.5rem 0;
        margin-top: 4rem;
      }

      .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .copyright {
        color: var(--gray-400);
        font-size: 0.875rem;
      }

      .social-links {
        display: flex;
        gap: 2rem;
      }

      .social-links a {
        color: white;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s ease;
      }

      .social-links a:hover {
        color: var(--bright-blue);
      }

      @media screen and (max-width: 768px) {
        .footer-content {
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }

        .social-links {
          justify-content: center;
        }
      }
    `,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
