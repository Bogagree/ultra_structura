import { AppConfig } from '../utils/AppConfig';

export const FooterCopyright = () => (
  <div className="footer-copyright">
    © {new Date().getFullYear()} {AppConfig.site_name}. AI Video Production.{' '}
    <a href={AppConfig.instagram} target="_blank" rel="noreferrer">
      {AppConfig.instagram_handle}
    </a>
    <style jsx>
      {`
        .footer-copyright :global(a) {
          @apply text-primary-600;
        }

        .footer-copyright :global(a:hover) {
          @apply underline;
        }
      `}
    </style>
  </div>
);
