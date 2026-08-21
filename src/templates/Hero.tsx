import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { AppConfig } from '../utils/AppConfig';
import { Logo } from './Logo';

export const Hero = () => (
  <Background color="bg-gray-100">
    <Section yPadding="py-6">
      <NavbarTwoColumns logo={<Logo xl />}>
        <li>
          <Link href="#services">Услуги</Link>
        </li>
        <li>
          <Link href={AppConfig.instagram} target="_blank" rel="noreferrer">
            Instagram
          </Link>
        </li>
      </NavbarTwoColumns>
    </Section>

    <Section yPadding="pt-20 pb-32">
      <HeroOneButton
        title={
          <>
            {'AI Video Production\n'}
            <span className="text-primary-600">для брендов и креаторов</span>
          </>
        }
        description="Ultra Structura — создаём визуальный контент с помощью нейросетей: ролики, Reels, рекламные клипы и storytelling для соцсетей."
        button={
          <Link href={AppConfig.instagram} target="_blank" rel="noreferrer">
            <Button xl>Смотреть работы в Instagram</Button>
          </Link>
        }
      />
    </Section>
  </Background>
);
