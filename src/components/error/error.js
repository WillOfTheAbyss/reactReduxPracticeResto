import React from 'react';
import NoMatch from '../redirect/'

const Error = ({status}) => {

    switch(status){
        case '404': 
            return <NoMatch />
        default: 
            return <div className="error">Error</div>;
    }
    
}

export default Error;