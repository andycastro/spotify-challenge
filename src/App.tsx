import './App.css';
import reactLogo from './assets/react.svg';
import { Home } from './components/Home';
import { Button } from './components/ui/button';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={reactLogo} className="h-8 w-8" alt="React logo" />
              <h1 className="text-2xl font-bold text-gray-900">
                Spotify Challenge
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Docs
              </Button>
              <Button variant="default">Connect Spotify</Button>
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
