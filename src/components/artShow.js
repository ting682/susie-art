import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { fetchArt } from '../actions/fetchArt'
// import { fetchArts } from '../actions/fetchArts'
import { Art } from './art'
import firebase from "firebase/app";

// let artsRef = firebase.database().ref('arts/')

export const ArtShow = (props) => {

    
    //    props.match.params.artTitle
    const dispatch = useDispatch()

    // const [fetched, setFetched] = useState(false)

    const artRoute = props.match.params.artTitle.toLowerCase()
    // debugger
    // const arts = useSelector(state => state.arts)
    // debugger
    const art = useSelector(state => state.art)
    
    
    // debugger
    const getData = async () => {

        
        // debugger
        // let artRef = firebase.database().ref('arts/').orderByChild('paypalPrice').equalTo('100').limitToFirst(3)
        let artRef = firebase.database().ref('arts/' + artRoute)
        artRef.once('value', snap => {
            //debugger
            const dataOne = snap.val()
            // debugger
            dispatch({type: 'GET_ART', payload: dataOne})
            // setFetched(true)
        })
        let artImagesRef = firebase.storage().ref('images/' + artRoute)

        dispatch({type: "START_REQUESTING_IMAGES"})
        const list = await artImagesRef.listAll()
        //  debugger
            Promise.all(
                
                list.items.map(async function(itemRef, idx, array) {
                    // artImagesRef.getDownloadURL()
                    
                    const url = await artImagesRef.child(itemRef.name).getDownloadURL()
                    dispatch({type: "GET_IMAGE", payload: {url: url, alt: itemRef.name.split('.')[0]}})
                    
                    
                })
            ).then(resp => {
                dispatch({type: "FINISHED_LOADING_IMAGES"})
                
            })

    }

    useEffect(getData, [artRoute, dispatch])

    if (art.artLoaded) {
        // debugger
        return (
            <React.Fragment>
                <Art title={art.art.title} description={art.art.description} price={art.art.price} images={art.art.images} paypalPrice={art.art.paypalPrice} artRoute={artRoute}/>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }

    
}