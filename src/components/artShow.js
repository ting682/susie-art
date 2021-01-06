import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { fetchArt } from '../actions/fetchArt'
import { fetchArts } from '../actions/fetchArts'
import { Art } from './art'

export const ArtShow = (props) => {

    
    //    props.match.params.artTitle
    const dispatch = useDispatch()

    const [fetched, setFetched] = useState(false)

    const artRoute = props.match.params.artTitle

    const arts = useSelector(state => state.arts)
    
    const art = arts.arts.find(art => art.title === artRoute)

    useEffect(() => {
        if (!fetched) {
            //debugger
            dispatch(fetchArts())
            setFetched(true)
            
        }
        
        
    },[fetched, dispatch])

    if (arts.loaded) {
        //debugger
        return (
            <React.Fragment>
                <Art title={art.title} description={art.description} price={art.price} images={art.images} paypalPrice={art.paypalPrice}/>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }

    
}