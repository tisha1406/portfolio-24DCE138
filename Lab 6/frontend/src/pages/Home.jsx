import Header from "../components/Header";
import About from "../components/About";
import Skills from "../components/Skills";
import Footer from "../components/Footer";

function Home() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Python",
  ];

  return (
    <>
      <Header name="Tisha Soni" color="teal" />

      <About bio="I am a Data Science student learning React and Web Development." />

      <Skills skillList={skills} />

      <Footer email="tisha@example.com" />
    </>
  );
}

export default Home;