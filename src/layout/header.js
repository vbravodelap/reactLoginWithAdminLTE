import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ usuario, logout }) {
    return(
        <div>
            <header className="main-header">
                {/* Logo */}
                <Link to="/pending" className="logo">
                    {/* mini logo for sidebar mini 50x50 pixels */}
                    <span className="logo-mini"><b>C</b>G</span>
                    {/* logo for regular state and mobile devices */}
                    <span className="logo-lg"><b>Control</b>Gastos</span>
                </Link>
                {/* Header Navbar */}
                <nav className="navbar navbar-static-top" role="navigation">
                    {/* Sidebar toggle button*/}
                    <Link to="/pending" className="sidebar-toggle" data-toggle="push-menu" role="button">
                    <span className="sr-only">Toggle navigation</span>
                    </Link>
                    {/* Navbar Right Menu */}
                    <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                        {/* User Account Menu */}
                        <li className="dropdown user user-menu">
                        {/* Menu Toggle Button */}
                        <Link to="#"className="dropdown-toggle" data-toggle="dropdown">
                            {/* hidden-xs hides the username on small devices so only the image appears. */}
                            <span className="hidden-xs">{usuario ? usuario.name : ''}</span>
                        </Link>
                        <ul className="dropdown-menu">
                            {/* The user image in the menu */}
                            <li className="user-header">
                            <p>
                                {usuario ? usuario.name : ''} 
                            </p>
                            </li>
                            {/* Menu Footer*/}
                            <li className="user-footer">
                            <div className="pull-left">
                                <Link to={'/user/' + usuario.sub } className="btn btn-default btn-flat">Perfil</Link>
                            </div>
                            <div className="pull-right">
                                <button onClick={logout} className="btn btn-default btn-flat">Sign out</button>
                            </div>
                            </li>
                        </ul>
                        </li>
                    </ul>
                    </div>
                </nav>
            </header>

        </div>
    );
}