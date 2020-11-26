export default class RestoSercice {
    
    _apiBase = 'http://localhost:3000/';

    getResource = async (url) => {
        const response = await fetch(`${this._apiBase}${url}`);
        
        if(response.status === 404){
            throw new Error('404');
        }else if(!response.ok){
            throw new Error('Server Error');
        }

        return await response.json();
    }

    getMenuItems = async() => {
        return await this.getResource('menu/');
    }

    getItem = async (id) => {
        return await this.getResource(`menu/${id}`);
    }

    setOrder = async (order) => {
        const response = await fetch(`${this._apiBase}orders`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(order)
        });

        if(!response.ok){
            throw new Error('Server Error');
        }
    }
}