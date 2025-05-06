import { useState } from "react";
import Auth from "../utils/auth";
import '../css/header.css'

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
            <nav className="bg-primary bg-gradient p-2">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="text-light">RSM Shrek The Musical</h1>
                    <div className="menu-icon" onClick={menuClickHandler}>
                        <div className={menuOpen ? "bar1-x bar1" : "bar1"}></div>
                        <div className={menuOpen ? "bar2-x bar2" : "bar2"}></div>
                        <div className={menuOpen ? "bar3-x bar3" : "bar3"}></div>
                    </div>
                </div>

                {Auth.loggedIn() ? (
                    <ul className={menuOpen ? "show" : "hide"}>
                        <li><a className="link-light" href="/">Callboard</a></li>
                        <li><a className="link-light" href="/contacts">Contacts</a></li>
                        <li><a className="link-light" href="/reports">Reports</a></li>
                        <li><a className="link-light" href="/downloads">Downloads</a></li>
                        <li><a className="link-light" href="/calendar">Calendar</a></li>
                        <li><a className="link-light" href="/change-password">Change Password</a></li>
                        {Auth.getProfile().data.name == 'Josh Hensley' && (
                            <>
                                <li><a className="link-light" href="/create-report">Create Report</a></li>
                                <li><a className="link-light" href="/edit-user">Edit User</a></li>
                                <li><a className="link-light" href="/add-user">Add User</a></li>
                            </>
                        )}
                        <li><button className='btn btn-light' onClick={() => Auth.logout()}>Logout</button></li>
                    </ul>
                ) : (
                    <ul className={menuOpen ? "show" : "hide"}>
                        <li><a href="/login"><button className="btn btn-light">Login</button></a></li>
                    </ul>
                )}
            </nav>
        </header>
    )
};

