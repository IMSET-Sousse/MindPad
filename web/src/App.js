import { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import NoteList from './components/NotesList';

function App() {

  const [notes, setNotes] = useState([]);
  const [added, setAdded] = useState(0)

  useEffect(() => {
    fetch('http://localhost:5000/api/notes')
      .then(response => response.json())
      .then(data => setNotes(data))
      .catch(error => console.error('Error fetching notes:', error));
  }, [added]);

  return (
    <div>
      <Form setAdded={setAdded}/>
      <NoteList notes={notes}/>
    </div>
  );
}

export default App;
