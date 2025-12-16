import React from 'react';

const Offer = () => {
    const priceOld = "97,00";
    const priceNew = "27,90";

    return (
        <div>
            <p>Previous Price: {priceOld}</p>
            <p>New Price: {priceNew}</p>
        </div>
    );
};

export default Offer;