import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []
    
    const [notes, setNotes] = useState(notesInitial)

    

    //----------------------------- Get Note --------------------------------------------------
    const getNote = async () => {
      // TODO: API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"), 
        }
      });
    const json = await response.json();
    setNotes(json)   
    }



    //----------------------------- Add Note --------------------------------------------------

    const addNote = async (title, description, tag) => {
      // API call
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"), 
        },
        body: JSON.stringify({title, description, tag}), 
      });
       
      console.log("Adding a Note");
      const json = await response.json(); 
    const  note = json;
      setNotes(notes.concat(note)) // .connat return new array where .push updated the array 

    }



    //-----------------------------------  Delete Note -----------------------------------------------
    const deleteNote = async(id) => {
      // API call

      const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"), 
        }
      });

      console.log("Deleting "+ id);
      const newNote = notes.filter((note) => {return note._id !== id});
      setNotes(newNote);

      const json = await response.json(); 
      console.log(json);
    }



    //-------------------------------- Edit Note ------------------------------------------------
    const editNote = async (id, title, description, tag) => {

      // API call
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"), 
        },
        body: JSON.stringify({title, description, tag}), 
      });
      const json = await response.json(); 
      console.log(json);

      let newNotes = JSON.parse(JSON.stringify(notes));

      // Logic to edit in client
      for(let i=0; i < newNotes.length; i++){
        const el = newNotes[i];
        if(el._id === id){
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }
      }
      setNotes(newNotes)
    }

    return (
        <>
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNote}}>
        {props.children}
        </NoteContext.Provider>
        </>
    )
}

export default NoteState;