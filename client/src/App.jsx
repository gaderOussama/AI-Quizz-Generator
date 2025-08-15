

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Quiz from './Components/Quiz.jsx';
import About from './pages/About.jsx';


function App() {
  return (
    <Routes>
      <Route path="/AI-Quizz-Generator/" element={<Home />}>
        <Route index element={<Quiz />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
