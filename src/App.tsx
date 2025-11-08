import './App.css';
import fullLogoGreen from './assets/Full_Logo_Green_RGB.svg';
import fullLogoWhite from './assets/Full_Logo_White_RGB.svg';
import { Home } from './components/Home';
import { ModeToggle } from './components/mode-toggle';
import { Button } from './components/ui/button';
import { useTheme } from './hooks/use-theme';

function App() {
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
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={getSpotifyLogo()} className="h-8" alt="Spotify Logo" />
              <h1 className="text-2xl font-bold text-foreground">
                Spotify Challenge
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <ModeToggle />
              <Button variant="outline" size="sm">
                📚 Docs
              </Button>
              <Button variant="default">🎵 Connect Spotify</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Home />
      </main>
    </div>
  );
}

export default App;
