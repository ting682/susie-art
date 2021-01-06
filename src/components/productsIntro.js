import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const ProductsIntro = (props) => {

    const [backgroundColor, setBackgroundColor] = useState("white")

    const handleMouseEnter = () => {
        setBackgroundColor('black')
    }

    const handleMouseOut = () => {
        setBackgroundColor('white')
    }

    return (
        <React.Fragment>
           <div className="introproducts">
            <div className="introproductstext" >
                    <h1 style={{color:"white"}} >See my extensive art collection</h1>
                    <p>Learn more about Susie's art collection</p>
                    <Button as={Link} to="/products" variant="outline-dark" style={{backgroundColor}} onMouseEnter={handleMouseEnter} onMouseOut={handleMouseOut}>Learn more</Button>
                </div>
            </div> 
        </React.Fragment>
    )
}