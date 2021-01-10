import React, { useEffect } from 'react'
import { useAuth } from '../contexts/authContext'
// import { v4 as uuidv4 } from 'uuid';
import { BlogInput } from './blogInput'
import { useDispatch, useSelector } from 'react-redux'
import firebase from "firebase/app";

import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Blog } from './blog'


export const BlogsContainer = (props) => {

    const { currentUser } = useAuth()

    const dispatch = useDispatch()

    const loaded = useSelector(state => state.blogs.loaded)

    const blogs = useSelector(state => state.blogs.blogs)

    

    useEffect(() => {
        function getData() {
            
        
            let blogsRef = firebase.database().ref('blogs/')
            // debugger
            return blogsRef.once('value', (snapshot) => {
                // debugger
                const data = snapshot.val()
                // console.log(data)
                dispatch({type: 'GET_BLOGS', payload: data})
            })
            
        }
        getData()
    },[dispatch])

    if(loaded) {
        return (
        
            <React.Fragment>
                <Breadcrumb>
                        <Breadcrumb.Item ><Link to="/">Home</Link></Breadcrumb.Item>
                        
                        <Breadcrumb.Item active>Blog</Breadcrumb.Item>
                </Breadcrumb>
                {!!currentUser && <BlogInput />}
                <br></br>
                {Object.entries(blogs).sort((a, b) => {
            return new Date(b[1].updatedAt) - new Date(a[1].updatedAt)
        }).map(blog => {
            // debugger
            return (
                <React.Fragment>
                    
                    <Blog key={blog[0]} blogId={blog[0]} updatedAt={blog[1].updatedAt} content={blog[1].content}/>
                </React.Fragment>
            )
        })}
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment></React.Fragment>
        )
    }

    
}