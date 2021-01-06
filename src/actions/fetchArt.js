export function fetchArt(artRoute) {
    return (dispatch) => {
        dispatch({type: 'START_REQUESTING_ART'})
        debugger
        // return fetch(`https://susie-wang-art.web.app/arts.json`)
        fetch(`http://localhost:3002/arts.json`)
        .then(resp => resp.json())
        .then(data => {
            //debugger
            debugger
            dispatch({type: 'GET_ART', payload: data.arts})
            //console.log(data)
            //debugger
        })
    }
}