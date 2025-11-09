import { SearchIcon } from 'lucide-react';
import fullLogoGreen from '../assets/Full_Logo_Green_RGB.svg';
import fullLogoWhite from '../assets/Full_Logo_White_RGB.svg';
import { ModeToggle } from '../components/mode-toggle';
import { Input } from '../components/ui/input';
import { useTheme } from '../hooks/use-theme';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const Header = ({ searchTerm, onSearchChange }: HeaderProps) => {
  const { theme } = useTheme();

  const getSpotifyLogo = () => {
    if (theme === 'system') {
      const isDarkSystem = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      return isDarkSystem ? fullLogoWhite : fullLogoGreen;
    }
    return theme === 'dark' ? fullLogoWhite : fullLogoGreen;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center gap-4">
        <a className="flex items-center space-x-2" href="/">
          <img src={getSpotifyLogo()} className="h-8" alt="Spotify" />
          <span className="hidden md:inline-block font-bold">
            Spotify Challenge
          </span>
        </a>

        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="relative group">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 dark:text-neutral-400 group-focus-within:text-neutral-700 dark:group-focus-within:text-neutral-200 transition-colors" />
              <Input
                type="search"
                placeholder="Buscar artistas..."
                className="pl-9 h-10 w-full rounded-md bg-white dark:bg-[#121212] text-sm border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-200 focus-visible:ring-1 focus-visible:ring-green-500 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-colors"
                value={searchTerm}
                onChange={e => onSearchChange(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
