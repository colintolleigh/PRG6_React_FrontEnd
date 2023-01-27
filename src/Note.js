import {useState} from "react";
import {Link} from "react-router-dom";

export function Note(props) {

    const [isEditing, setIsEditing] = useState(false);
    const [currentNote, setCurrentNote] = useState(props.note);


    const handleEdit = () => {
        setIsEditing(true);
        setCurrentNote(props.note);
    }

    const handleSave = (event) => {
        event.preventDefault();
        // code to save the edited note, using the currentNote state variable
        fetch(props.note._links.self.href, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentNote)
        })
            .then((response) => {
                if (response.ok) {
                    setIsEditing(false);
                    props.notesRefreshHandler();
                }
            })
    }

    const deleteNote = () => {
        fetch(props.note._links.self.href, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then((response) => props.notesRefreshHandler())
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
    }

    const handleChanges = (event) => {
        setCurrentNote({
            ...currentNote,
            [event.target.name]: event.target.value
        })
    }

    return (
        <section>
            {isEditing ? (
                <form>
                    <input type="text" value={currentNote.title} name="title" onChange={handleChanges}/><br/>
                    <input type="text" value={currentNote.body} name="body" onChange={handleChanges}/><br/>
                    <input type="text" value={currentNote.author} name="author" placeholder="Confirm author"
                           onChange={handleChanges}/><br/>
                    <button onClick={handleSave}>SAVE</button>
                    <button onClick={handleCancelEdit}>CANCEL</button>
                </form>
            ) : (
                <div>
                    <h2>{currentNote.title}</h2>
                    <Link to={"notes/" + props.note.id}>Read more</Link><br/>
                    <button onClick={handleEdit}>EDIT</button>
                    <br/>
                    <button onClick={deleteNote}>DELETE</button>
                </div>
            )}
        </section>
    );
}





