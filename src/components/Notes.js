import React,{useContext, useEffect, useRef,useState} from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitems from './Noteitems';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes,getNote,editNote} = context;   
    const [note, setNote] = useState({etitle: "", edescription: "", etag: "", id:""})
    const ref = useRef(null)
    const refClose = useRef(null)

    useEffect(() => {
        getNote();
        // eslint-disable-next-line
    }, []) 

    const updateNote = (currentNotes) =>{
        ref.current.click();
        setNote({etitle: currentNotes.title,edescription: currentNotes.description,etag: currentNotes.tag,id: currentNotes._id})
    }
    const handleClick = (e) =>{
        console.log('Updating... ', note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
      }
      const onChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})
      }

    return (
            <>
            <AddNote />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref} >
            Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="etitle" className="form-label">Title</label>
                        <input type="text" className="form-control" id="etitle" aria-describedby="etitleHelp" name="etitle" onChange={onChange} value={note.etitle} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="edescription" className="form-label">Description</label>
                        <input type="text" className="form-control" id="edescription" name="edescription" 
                        onChange={onChange} value={note.edescription} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="etag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="etag" name="etag" 
                        onChange={onChange} value={note.etag} />
                    </div>
                </form>
                </div>
                <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" onClick={handleClick} className="btn btn-primary">Update Notes</button>
                </div>
                </div>
            </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map(note => {
                return <Noteitems key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
            </>
    )
}

export default Notes
