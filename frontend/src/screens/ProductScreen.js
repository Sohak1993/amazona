import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { detailsProduct } from '../actions/productActions'

export default function ProductScreen(props) {

    const productDetail = useSelector( state => state.productDetail)
    const [qty, setQty] = useState(1)
    const { loading, error, product } = productDetail
    const dispatch = useDispatch()

    const productId = props.match.params.id
    

    useEffect(() => {
        dispatch(detailsProduct(productId))
    }, [dispatch, productId])

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }
    return(
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div>
                <Link to="/">Back to result</Link>
                <div className="row top">
                    <div className="col-2">
                        <img className="large" src={product.image} alt={product.image}></img>
                    </div>    
                    <div className="col-1">
                        <ul>
                            <li>
                                <h1>{product.name}</h1>
                            </li>
                            <li>
                                <Rating rating={ product.rating } numReviews={product.numReviews}/>
                            </li>
                            <li>
                                Price: { product.price }€
                            </li>
                            <li>
                                Description: <p>{ product.description }</p>
                            </li>
                        </ul>
                    </div>      
                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li>
                                    <div className="row">
                                        <div>Price</div>
                                        <div className="price">{ product.price }€</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Status</div>
                                        <div>
                                            { product.countInStock>0? (
                                                <span class="succes">En stock</span>
                                            ) : (
                                                <span className="danger">Indisponible</span>
                                            )}
                                        </div>
                                    </div>
                                </li>
                                {
                                    product.countInStock > 0 && (
                                        <>
                                        <li>
                                            <div className="row">
                                                <div>Qte</div>
                                                <div>
                                                    <select value={qty} onChange={e => setQty(e.target.value)}>
                                                      {
                                                          [...Array(product.countInStock).keys()].map(
                                                              (x) => (
                                                                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                              )
                                                          )
                                                      }  
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                            <li>
                                                <button 
                                                    onClick={addToCartHandler}
                                                    className="primary block">Ajouter au panier</button>
                                            </li>
                                        </>

                                    )
                                }
                            </ul>
                        </div>
                    </div>         
                </div>
            </div>
        )}
      </div>
        
    )
}