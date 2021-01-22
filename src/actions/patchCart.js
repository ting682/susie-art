export function patchCart(lineItem) {
    return (dispatch) => {
        dispatch({type: 'START_PATCH_CART'})
        // debugger
        const token = localStorage.getItem('susieartJWT')
        // return fetch(`http://127.0.0.1:5002/susie-wang-art/us-central1/carts`, {
        return fetch(`https://us-central1-susie-wang-art.cloudfunctions.net/carts`, {
            credentials: "include",
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },

            body: JSON.stringify({
                
                lineItem: lineItem
            })
        })
        // fetch(`http://localhost:3002/arts.json`)
        .then(resp => resp.json())
        .then(data => {
            //debugger
            
            dispatch({type: 'UPDATE_CART', payload: data})
            //console.log(data)
            //debugger
        })
    }
}