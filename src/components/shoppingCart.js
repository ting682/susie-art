import { useSelector, useDispatch } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'
import { fetchCart } from '../actions/fetchCart'
import { v4 as uuidv4 } from 'uuid'

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
            dispatch(fetchCart(localStorage.getItem('susieartuid')))
        }
  
    }

    const jwtCart = useSelector(state => state.cart.jwtCart)

    let cart = []

    for(const [key, value] of Object.entries(jwtCart)) {
        if (value["item"]) {
            cart.push(value["item"])
        }
        
    }

    return (
        <React.Fragment>
            <h1>Shopping Cart</h1>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Art image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                {cart.map(item => {
                
                return (
                    <tr>
                        <td>
                            <img src={"https://susie-wang-art.web.app/" + item.imageUrl.url} style={{width: "300px"}} alt={item.imageUrl.alt}/>
                        </td>
                        <td style={{textAlign: "center", verticalAlign: "center"}}>
                            {item.title}
                        </td>
                        <td>
                            {item.description}
                        </td>
                        <td>
                            {item.qty}
                        </td>
                        <td>
                            ${item.price}.00
                        </td>
                    </tr>
                )
                

            })}
                
                <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Subtotal</td>
                        <td>${cart.reduce((acc, item) => {
                            return acc + parseInt(item.price)
                        }, 0)}.00</td>
                    
                </tr>
                <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Shipping</td>
                        <td>$0.00</td>
                    
                </tr>
                <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Total</td>
                        <td>${cart.reduce((acc, item) => {
                            return acc + parseInt(item.price)
                        }, 0)}.00</td>
                    
                </tr>
                </tbody>
            </Table>
            
            <Button as={Link} to="/checkout">Checkout</Button>
            
        </React.Fragment>
    )
}