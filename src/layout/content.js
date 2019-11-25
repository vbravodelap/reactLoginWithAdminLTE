import React from 'react';

export default function Content({pageHeader, optionalDescription, children }) {
    return(
        <div>
  
            <section className="content-header">
                <h1>
                {pageHeader}
                <small>{optionalDescription ? optionalDescription : ''}</small>
                </h1>
            </section>
            {/* Main content */}
            <section className="content container-fluid">
                {children}
            </section>
        </div>
        
    )
}