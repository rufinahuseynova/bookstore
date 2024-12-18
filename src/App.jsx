import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Books from './components/Books'
import Millibooks from "./components/Millibooks";

function App() {
  

  return (
    <>
  <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Dünya Klassikləri</Link>
            </li>
            <li>
              <Link to="/azerbaycan-klasikleri">Azərbaycan Klassikləri</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/azerbaycan-klasikleri" element={<Millibooks />} />
        </Routes>
      </div>
    </Router>
   
    </>
  )
}

export default App
