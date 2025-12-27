import React from "react";
import "../App.css";
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
           <Link to="/signup" className="signup-btn">
                    Sign Up
           </Link>
        </div>
       <div className="card-container">
         <Link to="/products" className="card-link">
           <div className="card">
             <img src="/images/bow.png" alt="Crochet Hat" />
             <h3>Cozy Crochet Hat</h3>
             <p>Soft, warm, and handmade with love.</p>
           </div>
         </Link>

         <Link to="/products" className="card-link">
           <div className="card">
             <img src="/images/clip.png" alt="Crochet Bag" />
             <h3>Boho Crochet Bag</h3>
             <p>Perfect for your everyday essentials.</p>
           </div>
         </Link>

         <Link to="/products" className="card-link">
           <div className="card">
             <img src="/images/earrings.png" alt="Crochet Toy" />
             <h3>Cute Crochet Toy</h3>
             <p>Wholesome gifts for little hearts.</p>
           </div>
         </Link>

         <Link to="/products" className="card-link">
                    <div className="card">
                      <img src="/images/clip.png" alt="Crochet Bag" />
                      <h3>Boho Crochet Bag</h3>
                      <p>Perfect for your everyday essentials.</p>
                    </div>
                  </Link>
       </div>

       <div className="about-section">
         <h2>About Evolette</h2>
         <p>
           Evolette is a small crochet studio creating timeless,
           handcrafted pieces made slowly and thoughtfully.
         </p>
         <p>
           Every item is designed to feel personal — made with
           patience, quality yarns, and attention to detail.
         </p>
       </div>

       <div className="why-section">
         <h2>Why Evolette?</h2>
         <ul>
           <li>100% handmade — no mass production</li>
           <li>Limited pieces, crafted with care</li>
           <li>Soft, skin-safe quality yarns</li>
           <li>Made in small, thoughtful batches</li>
         </ul>
       </div>

      <div className="process-section">
        <h2>How It’s Made</h2>

        <div className="process-steps">
          <div className="step">
            <img src="/images/design.jpg" alt="Designed by hand" />
            <span>Designed by hand</span>
          </div>

          <div className="step">
            <img src="/images/crochet.jpg" alt="Crocheted stitch by stitch" />
            <span>Crocheted stitch by stitch</span>
          </div>

          <div className="step">
            <img src="/images/quality.jpg" alt="Quality checked" />
            <span>Quality checked</span>
          </div>

          <div className="step">
            <img src="/images/pack.jpg" alt="Carefully packed" />
            <span>Carefully packed</span>
          </div>
        </div>
      </div>


       <div className="cta-section">
         <h2>Ready to find your favorite?</h2>
         <Link to="/products" className="cta-btn">
           Explore Collection
         </Link>
       </div>

       <footer className="footer">
         <p>Handmade with care 🤍</p>
         <p>© Evolette</p>
       </footer>



      </div>

  );
}

export default Dashboard;
