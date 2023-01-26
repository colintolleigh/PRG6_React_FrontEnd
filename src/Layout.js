import {Link, Outlet} from "react-router-dom";

export function Layout() {

    return <div><header>
            <h1>Notes - Examples etc</h1>
    </header>
        <nav>
            <ul>
                <li><Link to="/">All Notes</Link></li>
                <li><Link to="create">New Note</Link></li>
            </ul>
        </nav>
        <div>
            <Outlet />
        </div>
    </div>
}