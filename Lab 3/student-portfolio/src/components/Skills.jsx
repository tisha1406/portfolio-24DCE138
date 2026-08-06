import "./Skills.css";

function Skills({ skillList }) {
  return (
    <section>
      <h2>Skills</h2>

      <div className="skills">
        {skillList.map((skill) => (
          <span key={skill} className="skill-chip">{skill}</span>
        ))}
      </div>
    </section>
  );
}

export default Skills;