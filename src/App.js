import {useEffect, useState} from "react";
import {Note} from "./Note";
import {NewNote} from "./NewNote";
import {BrowserRouter, Route} from "react-router-dom";
import * as PropTypes from "prop-types";
import {Layout} from "./Layout";

const URI_COLLECTION = "https://docent.cmi.hro.nl/bootb/demo/notes"

function Routes(props) {
  return null;
}

Routes.propTypes = {children: PropTypes.node};

export function App() {
  const [notes, setNotes] = useState([]);

  const loadJson = () => {
    fetch(URI_COLLECTION, {
      method: 'GET',
      headers: {
          'Accept': 'application/json'
      }
    })
        .then((response) => response.json())
        .then((result) => setNotes(result.items))
  }

  const showNotes = notes.map((value, key) =>
      <Note key={value.id} note={value} notesRefreshHandler={loadJson} />)

  useEffect(loadJson, [])

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>

      </Route>

    {/*<h1>Hello Notes!</h1>*/}
    {/*{showNotes}*/}
    {/*<NewNote notesRefreshHandler={loadJson}/>*/}
    </Routes>
  </BrowserRouter>;
}