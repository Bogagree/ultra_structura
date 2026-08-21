import Link from 'next/link';

import { Button } from '../button/Button';
import { CTABanner } from '../cta/CTABanner';
import { Section } from '../layout/Section';
import { AppConfig } from '../utils/AppConfig';

export const Banner = () => (
  <Section>
    <CTABanner
      title="Готовы обсудить AI-видео для вашего бренда?"
      subtitle={`Подписывайтесь на ${AppConfig.instagram_handle} и напишите в Direct.`}
      button={
        <Link href={AppConfig.instagram} target="_blank" rel="noreferrer">
          <Button>Открыть Instagram</Button>
        </Link>
      }
    />
  </Section>
);
