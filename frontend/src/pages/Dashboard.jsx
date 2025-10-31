import React from "react";
import "../Dashboard.css";
import { Link } from "react-router-dom";


function Dashboard() {
  return (
      <div className="dashboard">
        <div className="intro">
          <h1>Evolette</h1>
          <p>
            Handcrafted crochet pieces<br />
            made with love<br />
            and detail.
          </p>
        </div>
        <Link to="/products" className="card-container">
                <div className="card">
                  <img src="/images/bow.jpeg" alt="Crochet Hat" />
                  <h3>Cozy Crochet Hat</h3>
                  <p>Soft, warm, and handmade with love.</p>
                </div>

                <div className="card">
                  <img src="/images/clip.jpeg" alt="Crochet Bag" />
                  <h3>Boho Crochet Bag</h3>
                  <p>Perfect for your everyday essentials.</p>
                </div>

                <div className="card">
                  <img src="/images/earrings.jpeg" alt="Crochet Toy" />
                  <h3>Cute Crochet Toy</h3>
                  <p>Wholesome gifts for little hearts.</p>
                </div>
                <div className="card">
                     <img src="/images/earrings.jpeg" alt="Crochet Toy" />
                     <h3>Cute Crochet Toy</h3>
                     <p>Wholesome gifts for little hearts.</p>
                </div>
              </Link>
      </div>
  );
}

export default Dashboard;
