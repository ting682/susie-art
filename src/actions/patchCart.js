export function patchCart(userId, lineItems) {
    return (dispatch) => {
        dispatch({type: 'START_PATCH_CART'})
        // debugger
        const token = localStorage.getItem('susieartJWT')
        return fetch(`http://127.0.0.1:5002/susie-wang-art/us-central1/carts`, {
            credentials: "include",
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },

            body: JSON.stringify({
                uid: userId,
                lineItems: lineItems
            })
        })
        // fetch(`http://localhost:3002/arts.json`)
        .then(resp => resp.json())
        .then(data => {
            //debugger
            
            dispatch({type: 'GET_CART', payload: data.lineItems})
            //console.log(data)
            //debugger
        })
    }
}