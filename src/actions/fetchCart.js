export function fetchCart(userId) {
    return (dispatch) => {
        dispatch({type: 'START_GET_CART'})
        // debugger
        const token = localStorage.getItem('susieartJWT')
        return fetch(`https://us-central1-susie-wang-art.cloudfunctions.net/carts`, {
        // return fetch(`http://127.0.0.1:5002/susie-wang-art/us-central1/carts`, {
            
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
        // fetch(`http://localhost:3002/arts.json`)
        .then(resp => resp.json())
        .then(data => {
            
            // debugger
            dispatch({type: 'GET_JWT_CART', payload: data.lineItems})
            //console.log(data)
            //debugger
        })
    }
}