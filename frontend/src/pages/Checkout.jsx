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
            </div>
            <div className="summary">
                <h2>Order Summary</h2>
            </div>
        </div>
        );
    }

export default Checkout;