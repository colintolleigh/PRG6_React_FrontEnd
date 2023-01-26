import {Outlet} from "react-router-dom";

export function Layout() {


    return <div><header>
        <h1>Notes - Examples</h1>
    </header>
    <div>
        <Outlet />
    </div>
    </div>
}