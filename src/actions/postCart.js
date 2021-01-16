export function postCart(userId, lineItems) {
    return (dispatch) => {
        dispatch({type: 'START_POST_CART'})
        // debugger
        return fetch(`https://susiewangartapi.web.app/carts`, {
            
            
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid: userId,
                lineItems: lineItems
            })
        })
        // fetch(`http://localhost:3002/arts.json`)
        .then(resp => resp.json())
        .then(data => {
            // debugger
            
            dispatch({type: 'GET_CART', payload: data.lineItems})
            //console.log(data)
            //debugger
        })
    }
}