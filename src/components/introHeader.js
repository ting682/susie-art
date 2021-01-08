import React from 'react'

export const IntroHeader = (props) => {

    return (
        <React.Fragment>
            <div className="introheader" style={{paddingBottom: "20px"}}>
                <img src="images/susie_wang_art_logo.png" alt="Susie art logo" style={{width: "60%", maxWidth: "600px"}}></img>
                <h4>Enjoy the art journey!</h4>
                <a href="mailto:info@susiewangart.com" >info@susiewangart.com</a>
                
            </div>
        </React.Fragment>
    )
}