import './App.css';
import Note from './components/Note';
import { useState, useEffect } from 'react';

function App() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/notes')
      .then(response => response.json())
      .then(data => setNotes(data))
      .catch(error => console.error('Error fetching notes:', error));
  }, []);

  return (
    <div>
      {notes.map((note) => (<Note key={note.id} title={note.title} txt={note.txt} />))}
    </div>
  );
}

export default App;
