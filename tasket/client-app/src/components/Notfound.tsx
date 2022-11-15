import React from 'react';
import { Link } from 'react-router-dom';


const Notfound = () => 
{
    
    return (
        <div className="text-center">
            <h1>404 Not Found</h1>
            <p>
                Sorry, an error has occured, Requested page not found!
            </p>
            <br />
            <Link className="btn btn-primary btn-lg" to='/' >Return Top</Link>
        </div>
    );

}

export default Notfound;
