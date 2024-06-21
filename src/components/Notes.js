import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitems from './Noteitems';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, setNotes} = context;
    console.log(notes);
    
    return (
        <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map(note => {
        return <Noteitems note={note} />
        })}
    </div>
    )
}

export default Notes
