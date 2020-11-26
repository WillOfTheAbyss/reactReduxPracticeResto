import React, {Component} from 'react';
import Error from '../error';

export default class ErrorBoundry extends Component {
    
    constructor(props) {
        super(props);
        this.state = { hasError: false };
      }
    
      static getDerivedStateFromError(error) {
        // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
        return { hasError: true };
      }
    
    
    render() {
       
        if(this.state.hasError){
            return <Error />;
        }

        return this.props.children;
    }
}