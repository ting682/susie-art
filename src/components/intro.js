import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Intro = (props) => {

    const [backgroundColor, setBackgroundColor] = useState("white")

    const handleMouseEnter = () => {
        setBackgroundColor('black')
    }

    const handleMouseOut = () => {
        setBackgroundColor('white')
    }

    return (
        <div className="introimage">
            <div className="introtext" >
                <h1 style={{color:"white"}} >Unleash Your Imagination</h1>
                <p>Susie Wang Art for your art collection</p>
                <Button as={Link} to="blog/" variant="outline-dark" style={{backgroundColor}} onMouseEnter={handleMouseEnter} onMouseOut={handleMouseOut}>Learn more</Button>
            </div>
        </div>
    )
}