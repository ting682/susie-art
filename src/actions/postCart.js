export function postCart(userId, lineItem) {
    return (dispatch) => {
        dispatch({type: 'START_POST_CART'})
        // debugger
        // return fetch(`https://susiewangartapi.web.app/carts`, {
        return fetch(`http://127.0.0.1:5002/susie-wang-art/us-central1/carts`, {
            
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid: userId,
                lineItem: lineItem
            })
        })
        // fetch(`http://localhost:3002/arts.json`)
        .then(resp => resp.json())
        .then(data => {
            // debugger
            // debugger
            localStorage.setItem('susieartJWT', data.jwtToken)
            // dispatch({type: 'GET_JWT_CART', payload: data.jwtToken})
            //console.log(data)
            //debugger
        })
    }
}