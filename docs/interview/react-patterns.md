# Какие паттерны применяются в React

Вопрос на собеседовании. Ниже — готовый ответ: короткая формулировка, разбор паттернов и примеры из этого репозитория.

## Как ответить за 60 секунд

React строится на **композиции**, а не на наследовании. Логику переиспользуют **custom hooks**, UI собирают из маленьких компонентов через `children` и слоты. Состояние либо **поднимают** к общему предку, либо отдают через **Context**, если его нужно многим узлам дерева. Формы и инпуты делают **controlled**. Устаревшие способы шарить логику — **HOC** и **render props** — нужно знать, но в новом коде их почти не пишут.

Дальше интервьюер обычно просит: «приведи пример», «чем хук лучше HOC», «когда Context — плохая идея».

---

## Базовые паттерны (ожидают всегда)

### 1. Композиция (`children` и слоты)

Главный паттерн React: компонент не наследуют, а **вкладывают** друг в друга. Родитель задаёт каркас, содержимое приходит снаружи.

```tsx
type ICardProps = {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export const Card = (props: ICardProps) => (
  <article>
    <h2>{props.title}</h2>
    {props.children}
    {props.actions}
  </article>
);
```

`children` — основной слот. Именованные пропсы вроде `actions`, `logo`, `button` — дополнительные слоты. Так делают layout, модалки, хедеры.

**Когда:** почти всегда. Layout, обёртки, «дырки» под контент.

**Не путать с:** наследованием классов. В React его нет как рабочего подхода.

### 2. Поднятие состояния (Lifting State Up)

Если два компонента должны видеть одни и те же данные, состояние живёт у **ближайшего общего предка**. Дети получают значение и колбэк.

```tsx
export const PriceFilter = () => {
  const [maxPrice, setMaxPrice] = useState(0);

  return (
    <>
      <Slider value={maxPrice} onChange={setMaxPrice} />
      <ProductList maxPrice={maxPrice} />
    </>
  );
};
```

**Когда:** локальная связь 2–3 компонентов.

**Когда не надо:** тащить всё наверх «на всякий случай». Тогда дерево становится проп-дриллом.

### 3. Controlled и Uncontrolled

**Controlled** — источник правды в React-состоянии. Компонент получает `value` + `onChange`.

**Uncontrolled** — источник правды в DOM (`defaultValue`, `ref`).

```tsx
export const SearchField = () => {
  const [query, setQuery] = useState('');

  return (
    <input
      value={query}
      onChange={(event) => {
        setQuery(event.target.value);
      }}
    />
  );
};
```

На собеседовании говорят: формы, фильтры, всё, что валидируется на лету — controlled. Uncontrolled — редкие случаи (интеграция с неуправляемой библиотекой, простой файл-инпут, «написать и забыть»).

### 4. Custom Hooks

Переиспользуют **логику**, не разметку. Имя начинается с `use`, внутри можно вызывать другие хуки.

```tsx
export const useDebouncedValue = <T,>(value: T, delayMs: number): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setDebounced(value);
    }, delayMs);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [value, delayMs]);

  return debounced;
};
```

Хук не знает про JSX. Компонент остаётся тонким: данные + отрисовка.

**Когда:** повтор fetch, подписка, debounce, «залогинен ли пользователь».

**Антипаттерн:** хук, который возвращает готовую вёрстку. Это уже компонент.

### 5. Context / Provider

Context убирает проп-дрилл, когда многим узлам нужны одни и те же данные: тема, локаль, текущий пользователь, фичефлаги.

```tsx
type IAuthValue = {
  user: { id: string } | null;
};

const AuthContext = createContext<IAuthValue | null>(null);

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IAuthValue['user']>(null);
  const value = useMemo(() => ({ user }), [user]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
};
```

**Когда:** редкие, «глобальные для дерева» данные.

**Когда нет:** часто меняющийся стейт (каждый кейс в корзине). Любой `setState` в провайдере ре-рендерит всех потребителей. Тогда — стор (Redux, Zustand) или разбиение контекста на части.

---

## Паттерны UI-библиотек (middle / senior)

### 6. Compound Components

Несколько связанных компонентов делят неявное состояние. API читается как HTML.

```tsx
<Tabs defaultValue="code">
  <Tabs.List>
    <Tabs.Tab value="code">Код</Tabs.Tab>
    <Tabs.Tab value="preview">Превью</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="code">…</Tabs.Panel>
</Tabs>
```

Связь обычно через Context внутри группы. Снаружи не нужно прокидывать `activeId` в каждый таб.

**Примеры:** `Select` + `Option`, `Accordion`, `Menu`, `Tabs`.

### 7. Render Props (устаревающий)

Компонент принимает функцию и отдаёт ей данные.

```tsx
<Mouse>
  {(position) => (
    <span>
      {position.x} / {position.y}
    </span>
  )}
</Mouse>
```

Раньше так шарили логику. Сейчас то же самое делают хуком `useMousePosition()`. Render props ещё встречаются в старых API (`Formik`, ранний React Router).

### 8. HOC — Higher-Order Component (устаревающий)

Функция берёт компонент и возвращает обёртку: `withAuth(Page)`, `withRouter(Component)`.

Минусы, которые ждут услышать:

- «ад обёрток» (`withA(withB(withC(X)))`);
- коллизии пропсов;
- плохо с TypeScript;
- ломает `displayName` и `ref` без `forwardRef`.

Замена: хуки (`useAuth`, `useRouter`).

### 9. Presentational / Container (классика)

- **Presentational** — только UI, пропсы in / колбэки out, без запросов.
- **Container** — данные, эффекты, потом отдаёт в presentational.

С хуками контейнер часто схлопывается: `useProducts()` + глупый список. Разделение всё ещё полезно, когда одну и ту же карточку рисуют из разных источников.

### 10. Atomic Design / слои UI

Не паттерн React API, а способ резать UI:

- атомы: кнопка, инпут;
- молекулы / организмы: карточка, навбар;
- шаблоны: секции страницы;
- страницы: сборка.

В этом репозитории так и устроено: `src/button`, `src/layout` → `src/templates` → `src/pages`.

---

## Продвинутые (senior / library author)

Их не обязательно применять в проде каждый день, но на senior-собеседовании плюс, если назвать и объяснить.

| Паттерн | Суть | Зачем |
| --- | --- | --- |
| **State Reducer** | Потребитель перехватывает внутренние переходы состояния | Кастомизация без форка (`downshift`, `use-gesture`) |
| **Props Getters** | Хук отдаёт `getInputProps()`, `getToggleProps()` | Правильные a11y-атрибуты и обработчики без копипасты |
| **Headless** | Логика без своей вёрстки | Tailwind/свой дизайн поверх поведения (`Headless UI`, `Radix`, `TanStack Table`) |
| **Error Boundary** | Классовый `componentDidCatch` ловит ошибки в дереве | Не уронить всё приложение |
| **Lazy / Code splitting** | `React.lazy` + `Suspense` | Резать бандл по маршрутам |
| **Factory / конфиг** | Объект настроек (`AppConfig`) кормит UI | Один источник правды для бренда и SEO |

---

## Что сказать про «устаревшие vs современные»

Коротко, если спросят «какой паттерн сейчас правильный»:

1. Композиция и слоты — всегда.
2. Логика — custom hooks.
3. Сложный виджет с несколькими частями — compound + внутренний Context.
4. HOC и render props — читать легаси, не писать новые без причины.
5. Глобальный стейт — не Context «на всё», а стор или серверное состояние (`react-query` / `tanstack-query`).

---

## Как это выглядит в Ultra Structura

Лендинг простой (статический SSG), но паттерны те же.

**Композиция страницы.** `pages/index.tsx` рендерит `Base`, тот собирает секции:

```tsx
export const Base = () => (
  <div className="text-gray-600 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Hero />
    <VerticalFeatures />
    <Banner />
    <Footer />
  </div>
);
```

**Слоты (`children` + именованные ReactNode).** `Section`, `Background`, `NavbarTwoColumns`, `CenteredFooter`, `HeroOneButton`, `CTABanner` не знают конкретный контент — его передают снаружи.

```tsx
<HeroOneButton
  title={<>AI Video Production…</>}
  description="…"
  button={
    <Link href={AppConfig.instagram}>
      <Button xl>Смотреть работы в Instagram</Button>
    </Link>
  }
/>
```

**Presentational-компоненты.** `Button`, `VerticalFeatureRow`, `CTABanner` — пропсы in, разметка out. Запросы и глобальный стор не нужны: страница статическая.

**Конфиг как единственный источник правды.** `AppConfig` — title, locale, Instagram. Это фасад над «магическими строками».

**Чего здесь нет (и это нормально):** Context, хуки с бизнес-логикой, controlled-формы, HOC. На лендинге без клиентского состояния они были бы лишними. На собеседовании это хороший ход: паттерн выбирают под задачу, а не «чтобы было».

---

## Типичные follow-up

**Чем хук лучше HOC?**  
Явная зависимость: `const user = useAuth()`. Нет проп-коллизий, проще типы, нет башни обёрток.

**Почему не класть всё в Context?**  
Ре-рендеры. Context для редких данных (тема, пользователь). Для частых обновлений — стор с селекторами или локальный стейт.

**Controlled vs Uncontrolled — что выбрать?**  
Если React должен знать значение в каждый момент (валидация, disable кнопки, синхрон с URL) — controlled. Иначе можно uncontrolled.

**Можно ли наследование компонентов?**  
Нет. Композиция. Даже классовые компоненты в современном коде почти не пишут; exception — Error Boundary, пока нет хука-эквивалента в стабильном API.

**Как избежать проп-дрилла без Context?**  
Композиция: не протаскивать проп сквозь промежуточные слои, а вставить children ближе к месту использования. Если промежуточный слой не использует данные — он не должен их знать.

**Где держать серверные данные?**  
Не в Redux «по привычке». Fetch + кеш: TanStack Query. Redux/Zustand — клиентский UI-стейт (модалки, визарды, сложные формы).

---

## Чего не говорить

- «Мы используем все паттерны GoF в React» — большинство классических GoF сюда натягиваются искусственно.
- «Context заменяет Redux» — нет, это разные задачи.
- «HOC — лучший способ переиспользовать логику» — это ответ 2017 года.
- Перечислять 20 названий без примера. Лучше 4 паттерна + когда какой.

---

## Шпаргалка на ответ вслух

> В React основной паттерн — композиция: компоненты собираются через `children` и слоты, а не через наследование. Повторяющуюся логику выносим в custom hooks. Если несколько частей виджета делят состояние, делаем compound components. Состояние поднимаем к общему родителю; Context — только когда данные реально нужны глубоко в дереве. Инпуты держим controlled. HOC и render props знаю, в легаси встречаю, в новом коде заменяю хуками.
