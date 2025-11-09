import { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Home } from './components/Home';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Home searchTerm={searchTerm} />
      </main>
    </div>
  );
}

export default App;
