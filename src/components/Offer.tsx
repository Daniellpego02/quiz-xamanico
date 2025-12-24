import React from 'react';

export default function Offer() {
  const handleCheckout = () => {
    window.location.href = "https://www.seguropagamentos.com.br/mapa-xamanico";
  };

  return (
    <div>
      <h1>Special Offer</h1>
      <button onClick={handleCheckout}>Buy Now</button>
    </div>
  );
}