import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchArts } from '../actions/fetchArts'
import React from 'react'
import { Art } from './art'

export const ArtsContainer = (props) => {

    const dispatch = useDispatch()
    const arts = useSelector(state => state.arts.arts)
    // const requesting = useSelector(state => state.arts.requesting)
    const [fetched, setFetched] = useState(false)

    useEffect(() => {
        if (!fetched) {
            //debugger
            dispatch(fetchArts())
            setFetched(true)
        }
        
        
    },[fetched, dispatch])

    // const mapArts = () => {
    //     debugger
    //     arts.map(function (art, index) {
            
    //         return <Art key={index} title={art.title} description={art.description} price={art.price} images={art.images} />
    //     })
    // }

    return (
        <React.Fragment>
            {arts.map(function (art, index) {
            
            return <Art key={index} title={art.title} description={art.description} price={art.price} images={art.images} />
        })}
        </React.Fragment>
    )
}