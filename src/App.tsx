import './App.css';
import { Header } from './components/Header';
import { Home } from './components/Home';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Home />
      </main>
    </div>
  );
}

export default App;
