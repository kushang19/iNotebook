import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "6672a79e59e5115b7b85032a",
            "user": "66718c403611ebaec3564029",
            "title": "Kushang",
            "description": "This comeback is personal",
            "tag": "Just Do it",
            "date": "2024-06-19T09:40:46.420Z",
            "__v": 0
          },
          {
            "_id": "6672cde959e5115b7b85032d",
            "user": "66718c403611ebaec3564029",
            "title": "Add New Note",
            "description": "Add this to your playlist",
            "tag": "Youtube",
            "date": "2024-06-19T12:24:09.133Z",
            "__v": 0
          },
          {
            "_id": "6672a79e59e5115b7b85032a",
            "user": "66718c403611ebaec3564029",
            "title": "Kushang",
            "description": "This comeback is personal",
            "tag": "Just Do it",
            "date": "2024-06-19T09:40:46.420Z",
            "__v": 0
          },
          {
            "_id": "6672cde959e5115b7b85032d",
            "user": "66718c403611ebaec3564029",
            "title": "Add New Note",
            "description": "Add this to your playlist",
            "tag": "Youtube",
            "date": "2024-06-19T12:24:09.133Z",
            "__v": 0
          },
          {
            "_id": "6672a79e59e5115b7b85032a",
            "user": "66718c403611ebaec3564029",
            "title": "Kushang",
            "description": "This comeback is personal",
            "tag": "Just Do it",
            "date": "2024-06-19T09:40:46.420Z",
            "__v": 0
          },
          {
            "_id": "6672cde959e5115b7b85032d",
            "user": "66718c403611ebaec3564029",
            "title": "Add New Note",
            "description": "Add this to your playlist",
            "tag": "Youtube",
            "date": "2024-06-19T12:24:09.133Z",
            "__v": 0
          }
    ]

    const [notes, setNotes] = useState(notesInitial)

    return (
        <>
        <NoteContext.Provider value={{notes, setNotes}}>
        {props.children}
        </NoteContext.Provider>
        </>
    )
}

export default NoteState;