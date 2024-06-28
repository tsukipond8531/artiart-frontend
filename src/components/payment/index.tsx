import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [billingData, setBillingData] = useState({
    // Populate with appropriate billing data fields
  });

  const handlePayment = async () => {
    try {
      const authResponse = await axios.post('/payment/authenticate');
      const token = authResponse.data.token;

      const orderResponse = await axios.post('/payment/order', { token, amount, items: [] }); // Add items from cart
      const orderId = orderResponse.data.orderId;

      const paymentKeyResponse = await axios.post('/payment/payment_key', { token, orderId, amount, billingData });
      const paymentKey = paymentKeyResponse.data.paymentKey;
    console.log("Hello kiya lagta hai payement handle ho gai");
    console.log(paymentKey);
      // Redirect to Paymob's payment iframe
      window.location.href = `https://accept.paymobsolutions.com/api/acceptance/iframes/{iframe_id}?payment_token=${paymentKey}`;
    } catch (error) {
      console.error('Payment Error:', error);
    }
  };

  return (
    <div>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      {/* Add billing data inputs */}
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentForm;
