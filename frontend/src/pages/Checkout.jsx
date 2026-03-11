function Checkout() {
    return(
        <div className="checkout">
            <div className="shipping">
                <h2>Shipping Address</h2>
                <form>
                    <input type="text" placeholder="Full Name" />
                    <input type="tel" placeholder="Phone Number" />
                    <input type="text" placeholder="Address" />
                    <input type="text" placeholder="City" />
                    <input type="text" placeholder="State" />
                    <input type="text" placeholder="Pincode" />
                </form>

                <h2> Payment Method </h2>
                    <div className="payment-method">
                        <label>
                            <input type="radio" name="payment" value="upi"/>
                            Pay with UPI
                            </label>
                            <input
                                type="text"
                                placeholder="Enter UPI ID (example@upi)"
                                className="upi-input"
                              />
                        </div>
            </div>
            <div className="summary">
              <h2>Order Summary</h2>

              <div className="item">
                <span>Crochet Top × 1</span>
                <span>₹1200</span>
              </div>

              <div className="line"></div>

              <div className="price-row">
                <span>Subtotal</span>
                <span>₹1200</span>
              </div>

              <div className="price-row">
                <span>Shipping</span>
                <span>₹50</span>
              </div>

              <div className="price-row total">
                <span>Total</span>
                <span>₹1250</span>
              </div>

              <button className="place-order">Place Order</button>
            </div>
        </div>
        );
    }

export default Checkout;