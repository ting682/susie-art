import React from 'react'
import { ArtsContainer } from '../artsContainer'
import { Intro } from '../intro'

export const Home = (props) => {
    return (
        <React.Fragment>
            <Intro />

            <h3 style={{padding: "20% 0%"}}>Our Extensive Collection</h3>

            <ArtsContainer />
        </React.Fragment>
    )
}