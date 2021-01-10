import firebase from "firebase/app";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import Parser from 'html-react-parser'

export const About = () => {

    //debugger
    const dispatch = useDispatch()

    const aboutText = useSelector(state => state.about.about)

    const loaded = useSelector(state => state.about.loaded)

    useEffect(() => {
        let aboutRef = firebase.database().ref('about/abouttext')
        // debugger
        const getData = async () => {
            await aboutRef.once('value', snap => {
                // debugger
                const aboutData = snap.val()
                dispatch({type: "GET_ABOUT", payload: aboutData})
            })
        }
        getData()
    },[dispatch])


    if(loaded) {
        return (
            <React.Fragment>
                <img src="https://firebasestorage.googleapis.com/v0/b/susie-wang-art.appspot.com/o/about%2Fabout.jpg?alt=media&token=70457c33-cc44-4ceb-abd9-90b616ac29cc" alt="about Susie" style={{width: "100%", maxWidth: "600px", paddingBottom: "30px"}}>
                    
                </img>
                {Parser(aboutText)}
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment></React.Fragment>
        )
    }

    
}