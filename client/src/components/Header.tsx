import { FC } from 'react';

const Header: FC = () => {

    const toggleNavbar = () => {
        const navbar = document.querySelector('.navbar-collapse');
        if (navbar) {
            navbar.classList.toggle('show');
        }
    };

    return (
        <header>
            <nav className="bg-primary bg-gradient p-2 navbar navbar-expand-xl">
                <div className="container-fluid d-flex justify-content-between">
                    <h2 className="text-light">Digital Callboard</h2>
                    <button className="navbar-toggler" type="button" onClick={toggleNavbar}><span className="navbar-toggler-icon"></span></button>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
                        <li className="nav-item"><a className="nav-link link-light" href="/">Callboard</a></li>
                        <li className="nav-item"><a className="nav-link link-light" href="/contacts">Contacts</a></li>
                        <li className="nav-item"><a className="nav-link link-light" href="/reports">Reports</a></li>
                        <li className="nav-item"><a className="nav-link link-light" href="/downloads">Downloads</a></li>
                        <li className="nav-item"><a className="nav-link link-light" href="/videos">Videos</a></li>
                        <li className="nav-item"><a className="nav-link link-light" href="/calendar">Calendar</a></li>
                        <li className="nav-item"><a className="nav-link link-light" href="/change-password">Change Password</a></li>
                        <li className="nav-item"><a className="nav-link link-light" href="/create-report">Create Report</a></li>
                        <li className="nav-item"><a className="nav-link link-light" href="/user-edit">Edit/Add User</a></li>
                        <li className="nav-item"><a className='nav-link link-light' onClick={() => { console.log('clicked!') }}>Logout</a></li>
                    </ul>
                </div>


            </nav>
        </header>
    )
};

export default Header;
