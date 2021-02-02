// import { Carousel, CarouselItem } from 'bootstrap'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import PaypalButton from './paypal/paypalButton'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import { useAuth } from '../contexts/authContext'
import { postCart } from '../actions/postCart'

import { fetchCart } from '../actions/fetchCart'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const ArtProduct = (props) => {

    const loaded = useSelector(state => state.arts.loaded)

    // const { currentUser } = useAuth()

    const dispatch = useDispatch()

    // if (currentUser) {
    //     dispatch({type: 'SET_USER', payload: {uid: currentUser.uid}})
    // } else {
    //     // const guestUserId = uuidv4()
    //     // dispatch({type: 'SET_USER', payload: {uid: guestUserId}})
    // }

    const currentUserId = useSelector(state => state.user.user)
    
    // debugger

    // const [showPaypal, setShowPaypal] = useState(false)

    const mapImages = () => {
        // debugger
        return [props.images[0]].map(function(image, index) {
            //debugger

            return <LazyLoadImage key={index}
                        className="w-100" style={{maxWidth: "600px"}}
                        // src={"http://localhost:3002/" + image.url}
                        src={image.url}
                        alt={image.alt}
                        effect="blur"
                    />

            // return <CarouselItem key={index}>
            //         <img key={index}
            //             className="d-blog w-100"
            //             src={image.url}
            //             alt={image.alt}
            //         />

            //     </CarouselItem>
            
        })
    }

    // const handlePay = () => {
    //     setShowPaypal(true)
    // }

    // if (showPaypal) {
    //     //debugger
    //     return <PaypalButton image={props.images[0].url} imageAlt={props.images[0].alt} product={props.title} paypalPrice={props.paypalPrice}/>
    // }

    const addToCart = () => {
        
        // dispatch({type: 'ADD_ITEM_TO_CART', payload: {title: props.title, description: props.description, qty: 1, price: props.paypalPrice, imageUrl: props.images[0]}})
        dispatch(postCart(currentUserId, {title: props.title, description: props.description, qty: 1, price: props.paypalPrice, imageUrl: props.images[0]}))
        dispatch(fetchCart(currentUserId))
    }

    if (loaded) {
       // debugger
        return (
            <React.Fragment>
                
                {/* <Carousel> */}
            
                    
                {/* </Carousel> */}
                <Link to={{
                    pathname: `/products/${props.slug}`
                }} >
                {mapImages()}
                
                    <h2>{props.title}</h2>
                </Link>
                <p>{props.description}</p>
                <p>{props.price}</p>
                
                <Button onClick={addToCart}>Add to cart</Button>
                <br></br>
                {/* <Button onClick={handlePay}>Pay via Paypal</Button> */}
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }
    
}