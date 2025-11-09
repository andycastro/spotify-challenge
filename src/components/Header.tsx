import fullLogoGreen from '../assets/Full_Logo_Green_RGB.svg';
import fullLogoWhite from '../assets/Full_Logo_White_RGB.svg';
import { ModeToggle } from '../components/mode-toggle';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '../components/ui/navigation-menu';
import { Separator } from '../components/ui/separator';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <img src={getSpotifyLogo()} className="h-8" alt="Spotify" />
            <span className="hidden font-bold sm:inline-block">
              Spotify Challenge
            </span>
          </a>
        </div>

        <div className="mr-4 flex md:hidden">
          <img src={getSpotifyLogo()} className="h-7" alt="Spotify" />
        </div>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Button variant="ghost" size="sm">
                🏠 Home
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="ghost" size="sm">
                🔍 Search
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="flex md:max-w-sm lg:max-w-md">
              <Input
                type="search"
                placeholder="Buscar artistas..."
                className="h-9 w-full"
                value={searchTerm}
                onChange={e => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          <nav className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              📚 Docs
            </Button>
            <Separator orientation="vertical" className="h-4" />
            <ModeToggle />
            <Button variant="default" size="sm">
              🎵 Connect
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
