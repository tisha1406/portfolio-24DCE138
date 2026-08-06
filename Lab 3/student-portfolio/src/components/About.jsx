import "./About.css";

function About({ bio }) {
  return (
    <section className="about-card">
      <h2>About Me</h2>
      <p>{bio}</p>
    </section>
  );
}

export default About;