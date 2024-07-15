import React from "react";

export const About = () => {
  return (
    <div className="about-us">
      <header className="about-us-header">
        <h1>About Us</h1>
        <p>
          Welcome to our blog! Here, we share insights, stories, and tips on
          various topics. Our goal is to provide valuable content that can
          inspire and educate our readers.
        </p>
      </header>

      <section className="about-us-team">
        <h2>Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="path_to_image1.jpg" alt="Team Member 1" />
            <h3>John Doe</h3>
            <p>Founder & Editor-in-Chief</p>
          </div>
          <div className="team-member">
            <img src="path_to_image2.jpg" alt="Team Member 2" />
            <h3>Jane Smith</h3>
            <p>Senior Writer</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>
     
    </div>
  );
};
