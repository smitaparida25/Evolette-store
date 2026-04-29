import React from "react";
import "../App.css";
import { Link } from "react-router-dom";


function Dashboard() {
  return (
    <div className="dashboard">
      <div className="intro">
        <h1>Evolette ✨</h1>
        <p>
          Magical crochet dreams,<br />
          made stitch by stitch<br />
          just for you.
        </p>
        <Link to="/signup" className="signup-btn">
          Join the Magic
        </Link>
      </div>

      <div className="about-section">
        <h2>The Evolette Story</h2>
        <p>
          We weave love and slow living into every single loop.
          Our pieces aren't just handmade; they're heart-made.
        </p>
        <p>
          Designed to be your cozy little companions for
          a lifetime of soft moments and happy days.
        </p>
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
            <img src="/images/clip.png" alt="Hair Clip" />
            <h3>Petal Pop Clip</h3>
            <p>A little floral charm for your hair.</p>
          </div>
        </Link>

        <Link to="/products" className="card-link">
          <div className="card">
            <img src="/images/earrings.png" alt="Crochet Earrings" />
            <h3>Daisy Dreams</h3>
            <p>Wholesome elegance in every drop.</p>
          </div>
        </Link>

        <Link to="/products" className="card-link">
          <div className="card">
            <img src="/images/bookmark.jpeg" alt="Crochet Bookmark" />
            <h3>Bloom Bookmark</h3>
            <p>Keep your place in the prettiest way.</p>
          </div>
        </Link>
      </div>

      <div className="why-section">
        <h2>Why You'll Love Us</h2>
        <ul>
          <li>Purely Handmade 🧸</li>
          <li>Only a Few 🎀</li>
          <li>Cloud-Soft Yarns ✨</li>
          <li>Made with Patience ☁️</li>
        </ul>
      </div>

      <div className="process-section">
        <h2>Our Little Process</h2>

        <div className="process-steps">
          <div className="step">
            <img src="/images/design.jpg" alt="Drawn with Love" />
            <span>Drawn with Love</span>
          </div>

          <div className="step">
            <img src="/images/crochet.jpg" alt="Stitch by Stitch" />
            <span>Stitch by Stitch</span>
          </div>

          <div className="step">
            <img src="/images/quality.jpg" alt="Checked for Magic" />
            <span>Checked for Magic</span>
          </div>

          <div className="step">
            <img src="/images/pack.jpg" alt="Sent with a Hug" />
            <span>Sent with a Hug</span>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready for some magic?</h2>
        <Link to="/products" className="cta-btn">
          Shop the Magic
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
