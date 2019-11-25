import React from 'react';
import { Link } from 'react-router-dom';

export default function SideBar({ usuario }) {
    return (
        <div>
            <aside className="main-sidebar">
                {/* sidebar: style can be found in sidebar.less */}
                <section className="sidebar">
                    {/* Sidebar Menu */}
                    <ul className="sidebar-menu" data-widget="tree">
                    <li className="header">OPCIONES</li>
                    {/* Optionally, you can add icons to the links */}
                    <li>
                        <Link to="/users">
                            <i className="fa fa-users" /> 
                            <span>Usuarios</span>
                        </Link>
                    </li>
                    <li><Link to="/pending"><i className="fa fa-link" /> <span>Another Link</span></Link></li>
                    </ul>
                    {/* /.sidebar-menu */}
                </section>
                {/* /.sidebar */}
            </aside>

        </div>
    );
}