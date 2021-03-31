import './App.css';
import { Component } from 'react';
import { getMovies } from './services/fakeMovieService';
import Movies from './components/movies';

class App extends Component {
  render() {
    return <Movies />;
  }
}

// --- 1) Have movies state
// 2) Have count state that alters message
// 3) If count is zero message changes...
// --- 4) Render bootstrap table
// --- 5) Treat table rows as list, map through to render
// 5) Add button that alters movies state

export default App;
