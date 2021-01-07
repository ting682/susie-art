import React from 'react'
import { Intro } from '../intro'
import Contact from '../pages/contact'
import { ProductsIntro } from '../productsIntro'
import { IntroHeader } from '../introHeader'

export const Home = (props) => {
    return (
        <React.Fragment>
            <IntroHeader />
            <Intro />

            <h3 style={{padding: "20% 0%"}}>Our Extensive Collection</h3>

            <ProductsIntro />
            <Contact />
        </React.Fragment>
    )
}