import {Link, Outlet, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const URI_COLLECTION = "https://docent.cmi.hro.nl/bootb/demo/notes"


export function NoteDetail() {
    const params = useParams()

    const [note, setNote] = useState(null)

    function loadNote() {
        fetch(URI_COLLECTION + "/" + params.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((result) => setNote(result))
            .catch(error => console.log("ERROR: " + error))
    }

    useEffect(() => {
        loadNote()
    }, [])
    return <section>
        <h1>{note && note.title}</h1>
        <h2>By: {note && note.author}</h2>
        <p>{note && note.body}</p>
    </section>
}