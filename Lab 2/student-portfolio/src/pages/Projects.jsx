import "./Projects.css";

function Projects() {
  const projects = [
    {
      title: "Student Portfolio",
      description: "A React portfolio website built using reusable components."
    },
    {
      title: "Weather App",
      description: "Displays live weather information using an API."
    },
    {
      title: "Calculator",
      description: "A simple calculator developed using JavaScript."
    }
  ];

  return (
    <div className="content">
      <h1>My Projects</h1>

      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;