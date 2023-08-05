import React from "react";
import "./About.css"; // Import the CSS file
import { useEffect,useState } from "react";

const MentalHealthAwareness = () => {
    const [ourText, setOurText] = useState("");
  const msg = new SpeechSynthesisUtterance();

  useEffect(() => {
    // Fetch the message from the <h1> tag
    const h1Element = document.querySelector(".speech1");
    if (h1Element) {
      setOurText(h1Element.textContent);
    }
  }, []);

  const speechHandler = (msg) => {
    msg.text = ourText;
    window.speechSynthesis.speak(msg);
  };
  return (
    <div className="about">
      <header>
        <h1>Mental Health Awareness</h1>
      </header>



      <main>
        <section id="hero" className="hero">
         <h2>Welcome to Our Mental Health Awareness Website</h2>
      <p className="speech1">
        <h6>
            Mental health is not a sign of weakness; it is a testament to the strength of the human spirit.
            Just as we care for our physical well-being, we must prioritize and nurture our mental well-being too.
            Seeking help and support for mental health challenges is an act of courage, resilience, and self-empowerment.
            Let us break the stigma and embrace the truth: mental health is a vital part of our overall health, and caring for it is a mark of true strength and wisdom.
            Together, by fostering empathy, understanding, and compassion, we can build a world where everyone feels safe to share their struggles and find healing, hope, and happiness on their journey to well-being.
            Remember, you are not alone, and seeking help is not a sign of weakness—it is a courageous step towards inner strength and a brighter future.
        </h6>
        
      </p>
       <input
        type="text"
        value={ourText}
        placeholder="Enter Text"
        onChange={(e) => setOurText(e.target.value)}
      />
      <button onClick={() => speechHandler(msg)}>SPEAK</button>
       
      
        </section>

        <section id="videos" className="videos">
        <h2>Featured Videos</h2>
      <div class="video">
        <video controls>
        <source src="videos/video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      </div>
      <div class="video">
        <video controls>
        <source src="videos/video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      </div>
 
        </section>

        <section id="info" className="info">
          <h2>Mental Health Information</h2>
      <p>
        kjoij
      </p>
        </section>
      </main>

      <footer>
        <p>&copy; 2023 Mental Health Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MentalHealthAwareness;
