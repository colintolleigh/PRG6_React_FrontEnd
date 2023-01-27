import {useEffect, useState} from "react";
import {Note} from "./Note";
import {NewNote} from "./NewNote";
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {Layout} from "./Layout";
import {Error} from "./Error";
import {NoteDetail} from "./NoteDetail";

const URI_COLLECTION = "https://docent.cmi.hro.nl/bootb/demo/notes"


// Routes.propTypes = {children: PropTypes.node};

export function App() {
  const [notes, setNotes] = useState([]);

  const loadNotes = () => {
    fetch(URI_COLLECTION, {
      method: 'GET',
      headers: {
          'Accept': 'application/json'
      }
    })
        .then((response) => response.json())
        .then((result) => setNotes(result.items))
        .catch(error => console.log("ERROR: " + error))
  }

  useEffect(() => {
    loadNotes()
  }, [])

  const showNotes = notes.map((value, key) =>
      <Note key={value.id} note={value} notesRefresHandler={loadNotes}/>)

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={showNotes} />
        <Route path="create" element={<NewNote notesRefreshHandler={loadNotes} />}/>
        <Route path="notes./:id" element={<NoteDetail />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  </BrowserRouter>;
}