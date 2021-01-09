import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
// import { fetchArts } from '../actions/fetchArts'
import React from 'react'
import { ArtProduct } from './artProduct'
import { Breadcrumb } from 'react-bootstrap'
import firebase from "firebase/app";
import { Link } from 'react-router-dom'
import { EditArt } from './editArt'
import { EditArtImages } from "./editArtImages"

export const EditArtsContainer = (props) => {

    const dispatch = useDispatch()
    const arts = useSelector(state => state.arts.arts)
    // const requesting = useSelector(state => state.arts.requesting)
    // debugger
    // const [limit, setLimit] = useState(2)
    

    

    useEffect(() => {
        function getData() {
            
        
            let artsRef = firebase.database().ref('arts/')
            // debugger
            return artsRef.once('value', (snapshot) => {
                // debugger
                const data = snapshot.val()
                // console.log(data)
                dispatch({type: 'GET_ARTS', payload: data})
            })
            
        }
        getData()
    },[dispatch])

    // const mapArts = () => {
    //     debugger
    //     arts.map(function (art, index) {
            
    //         return <Art key={index} title={art.title} description={art.description} price={art.price} images={art.images} />
    //     })
    // }
    
        return (
            <React.Fragment>
                <Breadcrumb>
                        <Breadcrumb.Item ><Link to="/">Home</Link></Breadcrumb.Item>
                        
                        <Breadcrumb.Item active>Products</Breadcrumb.Item>
                </Breadcrumb>
                {Object.entries(arts).sort((a, b) => {
                    //debugger
                    return a[1].id - b[1].id
                }).map((art) => {
                    
                    // debugger
                
                return (
                    <React.Fragment>
                        <ArtProduct key={art[1].id} record={art[1].id} title={art[1].title} description={art[1].description} price={art[1].price} images={art[1].images} paypalPrice={art[1].paypalPrice} slug={art[1].slug} />
                        
                        <EditArt  key={art[1].id * 10} record={art[1].id} title={art[1].title} description={art[1].description} price={art[1].price} images={art[1].images} paypalPrice={art[1].paypalPrice} slug={art[1].slug} />
                        <EditArtImages key={art[1].id * 100} record={art[1].id} title={art[1].title} description={art[1].description} price={art[1].price} images={art[1].images} paypalPrice={art[1].paypalPrice} slug={art[1].slug} />
                    </React.Fragment>
                )
            })}
            
    
            </React.Fragment>
        )

    
}