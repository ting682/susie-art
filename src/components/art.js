// import { Carousel, CarouselItem } from 'bootstrap'
import React from 'react'
import { useSelector } from 'react-redux'
// import PaypalButton from './paypal/paypalButton'
// import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'


export const Art = (props) => {

    //debugger
    const loaded = useSelector(state => state.art.loaded)

    // const [showPaypal, setShowPaypal] = useState(false)

    const mapImages = () => {
        // debugger
        return props.images.map(function(image, index) {
            //debugger

            return <img key={index}
                        className="d-blog w-100"
                        // src={"http://localhost:3002/" + image.url}
                        src={"https://susie-wang-art.web.app/" + image.url}
                        alt={image.alt}
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

    if (loaded) {
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
                {mapImages()}
                
                <h2>{props.title}</h2>
                
                <p>{props.description}</p>
                <p>{props.price}</p>

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