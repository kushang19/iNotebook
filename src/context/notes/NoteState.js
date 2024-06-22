import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    
    const [notes, setNotes] = useState(notesInitial)

    //Get Note -------------------------------------------------------------------
    const getNote = async () => {
      // TODO: API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MThjNDAzNjExZWJhZWMzNTY0MDI5In0sImlhdCI6MTcxODcxODE5OX0.iAC8bdOS5QGeJ4AJ9Hi37KR2Z4h2FXz_D28tTSZ-jIQ", 
        }
      });
    const json = await response.json();
    setNotes(json)   
    }

    // Add Note -------------------------------------------------------------------
    const addNote = async (title, description, tag) => {
      // API call
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MThjNDAzNjExZWJhZWMzNTY0MDI5In0sImlhdCI6MTcxODcxODE5OX0.iAC8bdOS5QGeJ4AJ9Hi37KR2Z4h2FXz_D28tTSZ-jIQ", 
        },
        body: JSON.stringify({title, description, tag}), 
      });
       
      console.log("Adding a Note");
    const  note = {
        "_id": "6672a79e59e5117b85032a314",
        "user": "66718c403611ebaec3564029",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2024-06-19T09:40:46.420Z",
        "__v": 0
      }
      setNotes(notes.concat(note)) // .connat return new array where .push updated the array 
    }

    // Delete Note -------------------------------------------------------------------
    const deleteNote = async(id) => {
      // API call

      const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MThjNDAzNjExZWJhZWMzNTY0MDI5In0sImlhdCI6MTcxODcxODE5OX0.iAC8bdOS5QGeJ4AJ9Hi37KR2Z4h2FXz_D28tTSZ-jIQ", 
        }
      });

      console.log("Deleting "+ id);
      const newNote = notes.filter((note) => {return note._id !== id});
      setNotes(newNote);
    }

    // Edit Note -------------------------------------------------------------------
    const editNote = async (id, title, description, tag) => {

      // API call
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MThjNDAzNjExZWJhZWMzNTY0MDI5In0sImlhdCI6MTcxODcxODE5OX0.iAC8bdOS5QGeJ4AJ9Hi37KR2Z4h2FXz_D28tTSZ-jIQ", 
        },
        body: JSON.stringify({title, description, tag}), 
      });
      const json = response.json(); 

      // Logic to edit in client

       notes.forEach(element => {
          if(element._id === id){
            element.title = title; 
            element.description = description; 
            element.tag = tag; 
          }
       });
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