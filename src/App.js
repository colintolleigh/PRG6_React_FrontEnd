import {useEffect, useState} from "react";
import {Note} from "./Note";
import {NewNote} from "./NewNote";
import {BrowserRouter, Route} from "react-router-dom";
import * as PropTypes from "prop-types";
import {Layout} from "./Layout";
import {Error} from "./Error";
import {NoteDetail} from "./NoteDetail";

const URI_COLLECTION = "https://docent.cmi.hro.nl/bootb/demo/notes"

function Routes(props) {
  return null;
}

Routes.propTypes = {children: PropTypes.node};

export function App() {
  const [notes, setNotes] = useState([]);

  function loadNotes() {
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

  // const showNotes = notes.map((value, key) =>
  //     <Note key={value.id} note={value} notesRefreshHandler={loadNotes()} />)

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Notes notes={notes} notesRefreshHandler={() => loadNotes()} />} />
        <Route path="create" element={<NewNote notesRefreshHandler={() => loadNotes()} />}/>
        <Route path="notes./:id" element={<NoteDetail />} />
        <Route path="*" element={<Error />} />
      </Route>

    {/*<h1>Hello Notes!</h1>*/}
    {/*{showNotes}*/}
    {/*<NewNote notesRefreshHandler={loadJson}/>*/}
    </Routes>
  </BrowserRouter>;
}