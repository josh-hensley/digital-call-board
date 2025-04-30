import { useState } from "react";
import Auth from "../utils/auth";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const menuClickHandler = () => {
        ;
        if (!menuOpen) {
            setMenuOpen(true);
        }
        else {
            setMenuOpen(false);
        }
    }

    return (
        <header>
            <nav>
                <h1>RSM Shrek The Musical</h1>
                <div className="menu-icon" onClick={menuClickHandler}>
                    <div className={menuOpen ? "bar1-x bar1" : "bar1"}></div>
                    <div className={menuOpen ? "bar2-x bar2" : "bar2"}></div>
                    <div className={menuOpen ? "bar3-x bar3" : "bar3"}></div>
                </div>
            </nav>
            {Auth.loggedIn() ? (
                <ul className={menuOpen ? "show" : "hide"}>
                    <li><a href="/">Callboard</a></li>
                    <li><a href="/contacts">Contacts</a></li>
                    <li><a href="/reports">Reports</a></li>
                    <li><a href="/downloads">Downloads</a></li>
                    <li><a href="/calendar">Calendar</a></li>
                    <li><a href="/create-report">Create Report</a></li>
                    <li><button onClick={()=>Auth.logout()}>Logout</button></li>
                </ul>
            ) : (
                <ul className={menuOpen ? "show" : "hide"}>
                    <li><a href="/login"><button>Login</button></a></li>
                </ul>
            )}

        </header>


    )
};

