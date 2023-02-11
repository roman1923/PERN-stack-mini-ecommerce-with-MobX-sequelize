import React from 'react';
import { useStateValue } from '../StateProvider';
import CheckoutProduct from '../components/CheckoutProduct';


export const Basket = ({title, price, rating}) => {
    const [{basket, user}, dispatch] = useStateValue();
    return (
        <div className={'basket'}>
            {basket.map(item => (
                <CheckoutProduct
                    title={item.title}
                    price={item.price}
                    rating={item.rating}
                />
            ))}
        </div>
    );
};

export default Basket;