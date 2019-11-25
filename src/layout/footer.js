import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return(
        <div>
            {/* Main Footer */}
            <footer className="main-footer">
            {/* To the right */}
            <div className="pull-right hidden-xs">
                Anything you want
            </div>
            {/* Default to the left */}
            <strong>Copyright © 2016 <Link to="/">Conasim</Link>.</strong> Todos los derechos reservados.
            </footer>
        </div>
    )
}