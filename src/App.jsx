// src/App.js
import React from 'react';
import StudentsList from './components/StudentsList';
import { StudentsProvider } from './context/StudentsContext';

function App() {
  return (
    <div className="App">
      <StudentsProvider>
        <StudentsList />
      </StudentsProvider>
    </div>
  );
}

export default App;
