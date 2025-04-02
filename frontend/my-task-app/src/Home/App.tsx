// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import TaskList from '../components/TaskList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/" element={<Login />} /> {/* Rota padrão redireciona para login */}
      </Routes>
    </Router>
  );
};

export default App;
