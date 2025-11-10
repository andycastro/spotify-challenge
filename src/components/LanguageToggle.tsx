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
          className="inline-flex items-center gap-2 px-2 py-1 text-xs rounded bg-neutral-800 text-neutral-200 hover:bg-neutral-700 transition border border-neutral-700"
          aria-label={t('lang.toggle')}
        >
          {current === 'pt' ? <FlagPT /> : <FlagEN />}
          <span className="hidden sm:inline">
            {current === 'pt' ? t('lang.pt') : t('lang.en')}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={6} className="w-40">
        <DropdownMenuItem
          onClick={() => change('pt')}
          className="cursor-pointer flex items-center gap-2"
        >
          <FlagPT /> <span className="text-xs">{t('lang.pt')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => change('en')}
          className="cursor-pointer flex items-center gap-2"
        >
          <FlagEN /> <span className="text-xs">{t('lang.en')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
