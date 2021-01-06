import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchArts } from '../actions/fetchArts'
import React from 'react'
import { ArtProduct } from './artProduct'
import { Breadcrumb } from 'react-bootstrap'

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
            <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    
                    <Breadcrumb.Item active>Products</Breadcrumb.Item>
                </Breadcrumb>
            {arts.map(function (art, index) {
            
            return <ArtProduct key={index} title={art.title} description={art.description} price={art.price} images={art.images} paypalPrice={art.paypalPrice}/>
        })}
        </React.Fragment>
    )
}