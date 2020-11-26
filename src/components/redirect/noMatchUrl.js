import React from 'react';
import {useLocation, Link} from 'react-router-dom';
import { Alert, Button  } from 'reactstrap';

const NoMatch = () => {
    const location = useLocation();
  
    return (
        <>
            <Alert color="danger">Страницы с таким url <code>{location.pathname}</code> не существует</Alert>
            <Link to = '/'><Button color="primary">Вернутся на главную страницу</Button></Link>
        </>
    );
  }

export default NoMatch;