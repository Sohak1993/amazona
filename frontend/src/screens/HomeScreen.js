import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProduct } from '../actions/productActions';

export default function HomeScreen() {

  const productList = useSelector( state => state.productList)
  const { loading, error, products } = productList
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProduct())
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  );
}
