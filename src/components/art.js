// import { Carousel, CarouselItem } from 'bootstrap'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
// import PaypalButton from './paypal/paypalButton'
// import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
// import firebase from "firebase/app";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'

export const Art = (props) => {

    //debugger
    // const loaded = useSelector(state => state.art.imagesLoaded)
    const artImages = useSelector(state => state.art.images)
    // const [load, setLoad] = useState(true)
    // const [showPaypal, setShowPaypal] = useState(false)
    // const dispatch = useDispatch()

    const mapImages = () => {
        // debugger
        
            return artImages.map(function(image, index) {
                //debugger
                
                return <img key={index}
                            className="w-100" style={{maxWidth: "600px"}}
                            // src={"http://localhost:3002/" + image.url}
                            src={image.url}
                            alt={image.alt}
                        />
            })
        
            
        
        // return props.images.map(function(image, index) {
        //     //debugger

        //     return <img key={index}
        //                 className="w-100" style={{maxWidth: "600px"}}
        //                 // src={"http://localhost:3002/" + image.url}
        //                 src={"https://susie-wang-art.web.app/" + image.url}
        //                 alt={image.alt}
        //             />

            // return <CarouselItem key={index}>
            //         <img key={index}
            //             className="d-blog w-100"
            //             src={image.url}
            //             alt={image.alt}
            //         />

            //     </CarouselItem>
            
        
    }

    // const handlePay = () => {
    //     setShowPaypal(true)
    // }

    // if (showPaypal) {
    //     //debugger
    //     return <PaypalButton image={props.images[0].url} imageAlt={props.images[0].alt} product={props.title} paypalPrice={props.paypalPrice}/>
    // }
    // debugger
    
    
    // let artDatabaseRef = firebase.database().ref('arts/' + props.artRoute)

    // artImagesRef.child('fairytale.jpg').getDownloadURL().then(url => {
    //     console.log(url)
    // })
    
    // let allPromises = []



    useEffect(() => {
        // debugger
        
        
        
            
            
  
            
            // const list = await artImagesRef.listAll().then(res => {
            //     res.items.forEach(function(itemRef, idx, array) {
            //         // artImagesRef.getDownloadURL()
                    
            //         artImagesRef.child(itemRef.name).getDownloadURL().then(url => {
            //             // console.log(url)
    
            //             dispatch({type: "GET_IMAGE", payload: {url: url, alt: itemRef.name.split('.')[0]}})
                        
            //         })
            //     })
                
            //     //debugger
                
                  
            // })
        
        
        
    },[])
    

    // debugger
    
       
        return (
            <React.Fragment>
                {/* <Carousel> */}
            
                    
                {/* </Carousel> */}
                <Breadcrumb>
                    <Breadcrumb.Item ><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/products">Products</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{props.title}</Breadcrumb.Item>
                </Breadcrumb>
                <Carousel>
                    {mapImages()}
                </Carousel>
                
                
                <h2>{props.title}</h2>
                
                <p>{props.description}</p>
                <p>{props.price}</p>

                {/* <Button onClick={handlePay}>Pay via Paypal</Button> */}
            </React.Fragment>
        )
    
    
}