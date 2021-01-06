export function fetchArts(history) {
    return (dispatch) => {
        dispatch({type: 'START_REQUESTING_ARTS'})
        return fetch(`http://localhost:3002/arts.json`)
        .then(resp => resp.json())
        .then(data => {
            
            dispatch({type: 'GET_ARTS', payload: data.arts})
            //console.log(data)
            //debugger
        })
    }
}