# План работ

Каждый этап — своя ветка и PR. После каждого этапа проект собирается и работает.

## 1. `refactor/template-files-builder` — подстановка во все файлы шаблона

- [+] `ArchiveEntry.content: string | Buffer`; сервис больше не вызывает `archive.glob`
- [+] Обход шаблона: своя рекурсия на `readdir(dir, { withFileTypes: true })`, которая **не заходит** в игнорируемые папки (1,9 мс вместо 658 мс с `recursive: true`)
- [+] Подстановка в одном месте: `TemplatesService.render`, его используют `renderFile` и `renderDir`
- [+] Конфиг `TEMPLATE_VARIABLES`: все простые подстановки «значение из запроса → плейсхолдер» в одном файле (проект + цвета темы)
- [+] `TemplateFilesBuilder`: собирает переменные из конфига, рендерит шаблон через `renderDir` (текст — с подстановкой, бинарные — как есть)
- [+] Удалить `ThemeBuilder`: `globals.css` рендерится в общем проходе
- [ ] `PackageJsonBuilder` берёт переменные из того же конфига, сам только сливает зависимости
- [ ] Отдельными билдерами остаётся только логика: `PackageJsonBuilder` (слияние JSON), `LayoutBuilder` (код шрифтов), `PagesBuilder` (новые файлы)
- [ ] Слияние по пути: сначала шаблон, потом билдеры; файл билдера заменяет файл шаблона
- [+] `TEMPLATE_IGNORE` — только мусор: `node_modules`, `.next`, `.git`, `.turbo`, `.DS_Store`
- [ ] `warn` в лог: два билдера пишут один файл; в тексте остался неподставленный `__ЧТО_ТО__`
- [ ] Шаблон: `src/consts/site.const.ts` (`SITE_NAME`), алиас `@/consts` в `tsconfig.json`
- [ ] Проверка: сгенерированный проект собирается через `next build`, в `site.const.ts` реальное имя

## 2. `feat/generation-options` — инфраструктура опций (на React Query)

- [ ] Контракт `ProjectOptions` в `@repo/types`, DTO с валидацией
- [ ] Билдеры получают контекст `{ dto, options }`
- [ ] Манифест опции в API: зависимости (`Record`), провайдеры с `order`, плагины `next.config`, константы
- [ ] `OptionFilesBuilder` — копирует `templates/options/<id>/static/` тем же кэшированным чтением
- [ ] `ProvidersBuilder` — генерирует `providers.tsx`, layout всегда оборачивает в `<Providers>`
- [ ] `NextConfigBuilder`, `ConstsIndexBuilder` (`src/consts/index.ts`)
- [ ] Зависимости опции побеждают; пакеты шаблона (`next`, `react`) защищены → 400
- [ ] Проверка: проект с React Query и без собирается

## 3. `feat/i18n-option` — мультиязычность

- [ ] `I18nOptions { locales, defaultLocale, localePrefix }`; наличие объекта = включено
- [ ] Валидация языка: регулярка BCP 47 + `Intl.getCanonicalLocales` + `Intl.DisplayNames`, общая для API и формы
- [ ] Генерация: `src/consts/locales.const.ts`, `src/lib/i18n/messages/<locale>.json`
- [ ] Статика: `src/lib/i18n/{routing,navigation,request}.ts`, `src/proxy.ts`
- [ ] Layout для `app/[locale]`, `getAppDir()` для `PagesBuilder`
- [ ] Плагин `next-intl` с путём `./src/lib/i18n/request.ts`
- [ ] Поправить `LOCAL_PREFIX` → `LOCALE_PREFIX` в `templates/options/i18n/static/routing.ts`, дописать `request.ts`
- [ ] Проверка: `en`/`ru`, все три режима префикса, с React Query и без

## 4. `feat/web-options-step` — шаг «Возможности» в форме

- [ ] Переключатели опций
- [ ] Настройка языков: теги с названиями (`Intl.DisplayNames`), язык по умолчанию, режим префикса
- [ ] Пакеты опций в списке зависимостей заблокированы с подписью

## 5. Качество

- [ ] CI в GitHub Actions: линт, типы, сборка на каждый PR (можно раньше)
- [ ] Тесты: билдеры, валидация языков, e2e на генерацию
- [ ] Корневой README вместо «Turborepo starter»
- [ ] Защита `main`: только через PR с зелёным CI
