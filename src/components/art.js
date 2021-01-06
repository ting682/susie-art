// import { Carousel, CarouselItem } from 'bootstrap'
import React from 'react'
import { useSelector } from 'react-redux'


export const Art = (props) => {

    const loaded = useSelector(state => state.arts.loaded)

    const mapImages = () => {
        // debugger
        return props.images.map(function(image, index) {
            //debugger

            return <img key={index}
                        className="d-blog w-100"
                        src={image.url}
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
    if (loaded) {
       // debugger
        return (
            <React.Fragment>
                {/* <Carousel> */}
            
                    {mapImages()}
                {/* </Carousel> */}
                
                
                <h2>{props.title}</h2>
                <p>{props.description}</p>
                <p>{props.price}</p>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }
    
}