import { VerticalFeatureRow } from '../feature/VerticalFeatureRow';
import { Section } from '../layout/Section';

export const VerticalFeatures = () => (
  <div id="services">
    <Section
      title="Что мы делаем"
      description="Производство видео на базе AI — от идеи и сценария до готового ролика для Instagram, рекламы и digital-кампаний."
    >
      <VerticalFeatureRow
        title="AI-видео для брендов"
        description="Генерируем и монтируем ролики под ваш продукт: продукт-шоукейсы, рекламные клипы и короткие форматы для соцсетей — быстрее и гибче классического продакшна."
        image="/assets/images/feature-ai-video.jpg"
        imageAlt="AI-видео для брендов"
      />
      <VerticalFeatureRow
        title="Reels и короткий контент"
        description="Вертикальные ролики 9:16 под Instagram Reels и Stories: динамичный монтаж, сильный хук в первые секунды и визуал, который удерживает внимание."
        image="/assets/images/g5.jpg"
        imageAlt="Reels и короткий контент"
        reverse
      />
      <VerticalFeatureRow
        title="Креатив и storytelling"
        description="Помогаем сформулировать идею, стиль и нарратив. Ultra Structura объединяет AI-инструменты и продакшн-мышление, чтобы контент работал на бренд."
        image="/assets/images/g1.jpg"
        imageAlt="Креатив и storytelling"
      />
    </Section>
  </div>
);
