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

    const artRoute = props.match.params.artTitle
    // debugger
    // const arts = useSelector(state => state.arts)
    // debugger
    const art = useSelector(state => state.art)
    
    
    // debugger
    const getData = () => {

        
        // debugger
        let artRef = firebase.database().ref('arts/').orderByChild('slug').equalTo(artRoute.toLowerCase())

        artRef.once('value', snap => {
            //debugger
            const dataOne = Object.values(snap.val())[0]
            // debugger
            dispatch({type: 'GET_ART', payload: dataOne})
            // setFetched(true)
        })

        // artRef.on('value', (snapshot) => {
        
        //     const data = snapshot.val()
        //     // debugger
        //     dispatch({type: 'GET_ARTS', payload: data})
        // })
        //debugger
    }

    useEffect(getData, [])

    if (art.loaded) {
        // debugger
        return (
            <React.Fragment>
                <Art title={art.art.title} description={art.art.description} price={art.art.price} images={art.art.images} paypalPrice={art.art.paypalPrice}/>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }

    
}