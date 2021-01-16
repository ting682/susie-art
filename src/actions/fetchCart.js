export function fetchCart(userId) {
    return (dispatch) => {
        dispatch({type: 'START_GET_CART'})
        // debugger
        return fetch(`https://us-central1-susie-wang-art.cloudfunctions.net/carts`, {
            
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        // fetch(`http://localhost:3002/arts.json`)
        .then(resp => resp.json())
        .then(data => {
            
            
            dispatch({type: 'GET_CART', payload: data.lineItems})
            //console.log(data)
            //debugger
        })
    }
}