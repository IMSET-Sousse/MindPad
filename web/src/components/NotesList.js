import Note from './Note'
export default function NoteList(params){
    let notes = params.notes
    return notes.map((note) => (<Note key={note.id} title={note.title} txt={note.txt} />))
}