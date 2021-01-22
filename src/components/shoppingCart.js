import { useSelector, useDispatch } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'
import { fetchCart } from '../actions/fetchCart'
import { v4 as uuidv4 } from 'uuid'
import { patchCart } from '../actions/patchCart'

export const ShoppingCart = (props) => {

    const currentUserId = useSelector(state => state.user.user)

    const dispatch = useDispatch()

    if (currentUserId.length === 0) {
        
        if (localStorage.getItem('susieartuid') === null) {
            const guestUserId = uuidv4()
            localStorage.setItem('susieartuid', guestUserId)
            dispatch({type: 'SET_USER', payload: {uid: guestUserId}})
        } else {
            dispatch({type: 'SET_USER', payload: {uid: localStorage.getItem('susieartuid')}})
            dispatch(fetchCart(currentUserId))
        }
  
    }

    const jwtCart = useSelector(state => state.cart.jwtCart)

    let cart = []

    for(const [key, value] of Object.entries(jwtCart)) {
        if (value["item"]) {
            cart.push(value["item"])
        }
        
    }

    const handleRemoveItem = (event, lineItem) => {
        dispatch(patchCart(lineItem))
    }

    return (
        <React.Fragment>
            <h1>Shopping Cart</h1>
            <Table borderless hover responsive style={{width: "100%"}}>
                {/* <thead>
                    <tr>
                        <th>Art image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead> */}
                <tbody>
                {cart.map(item => {
                
                return (
                    <>
                    
                    
                    <tr>
                        <td colSpan="3" >
                            <img src={item.imageUrl.url} alt={item.imageUrl.alt}/>
                            <br></br><br></br>
                            <Button variant="outline-dark" size="sm" onClick={(event) => handleRemoveItem(event, item.title)}>remove</Button>
                        </td>
                        <td style={{textAlign: "center", verticalAlign: "center"}}>
                            {item.title} <br></br>
                            {item.description}<br></br><br></br>
                            ${item.price}.00
                            
                            
                            
                        
                        </td>
                        
                    </tr>
                   
                    </>
                )
                

            })}
               
                

            
                
                {/* <tr>
                        
                        <td colSpan="3">Subtotal</td>
                        <td>${cart.reduce((acc, item) => {
                            return acc + parseInt(item.price)
                        }, 0)}.00</td>
                    
                </tr>
                <tr>
                        
                        
                        <td colSpan="3">Shipping</td>
                        <td>$0.00</td>
                    
                </tr>
                <tr>
                        
                        
                        <td colSpan="3">Total</td>
                        <td>${cart.reduce((acc, item) => {
                            return acc + parseInt(item.price)
                        }, 0)}.00</td>
                    
                </tr> */}
                </tbody>
            </Table>
            
            <Button as={Link} to="/checkout">Checkout</Button>
            
        </React.Fragment>
    )
}