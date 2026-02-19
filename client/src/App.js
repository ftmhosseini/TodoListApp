import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFound } from './pages/NotFound.jsx';
import { HomePage } from './pages/HomePage.jsx';

function App() {
  

  return (
    <BrowserRouter>
      {/* define the fixed position for header and attached to top*/}
      <header>
        <a className="navbar-brand" href="/">Todo List App</a>
      </header>

      <main className='container' style={{ display: 'relative', paddingTop: '20vh' }}>
        <div>
          <Routes>
            {/* Route for the landing page, passing todos as a prop */}
            <Route path='/' element={<HomePage/>} />
            {/* Catch-all route for any undefined URLs */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </main>

      {/* define the fixed position for footer and attached to bottom*/}
      <footer>
        <h5>Connect with me</h5>
        <a href="https://www.linkedin.com/in/ftmhosseini/"><i className="fab fa-linkedin"></i></a>
        <a href="https://github.com/ftmhosseini"><i className="fab fa-github"></i></a>
        <a href="mailto:fatemehosseini.a@gmail.com"><i className="fas fa-envelope"></i></a>
        <p className="mt-3">© 2025 Fatemeh Hosseini — All Rights Reserved</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
