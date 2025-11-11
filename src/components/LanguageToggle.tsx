import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const FlagPT = () => (
  <span role="img" aria-label="Brasil" className="text-base">
    🇧🇷
  </span>
);
const FlagEN = () => (
  <span role="img" aria-label="USA" className="text-base">
    🇺🇸
  </span>
);

export const LanguageToggle: React.FC = () => {
  const { i18n, t } = useTranslation('common');
  const current = i18n.language.startsWith('pt') ? 'pt' : 'en';

  const change = (lng: string) => {
    if (lng !== current) {
      i18n.changeLanguage(lng);
      try {
        localStorage.setItem('app.lang', lng);
      } catch (err) {
        console.warn('Language persistence failed:', err);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-2 py-1 text-xs rounded transition border shadow-sm
            bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100
            dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-700"
          aria-label={t('lang.toggle')}
        >
          {current === 'pt' ? <FlagPT /> : <FlagEN />}
          <span className="hidden sm:inline">
            {current === 'pt' ? t('lang.pt') : t('lang.en')}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="w-40 bg-white text-neutral-800 border border-neutral-200 shadow-sm
          dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700"
      >
        <DropdownMenuItem
          onClick={() => change('pt')}
          className="cursor-pointer flex items-center gap-2 focus:bg-neutral-100 dark:focus:bg-neutral-800/50"
        >
          <FlagPT /> <span className="text-xs">{t('lang.pt')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => change('en')}
          className="cursor-pointer flex items-center gap-2 focus:bg-neutral-100 dark:focus:bg-neutral-800/50"
        >
          <FlagEN /> <span className="text-xs">{t('lang.en')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
