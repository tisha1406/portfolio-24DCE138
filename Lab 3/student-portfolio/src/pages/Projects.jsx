import { useState, useEffect } from "react";
import "./Projects.css";

import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchRepos = () => {
    setLoading(true);
    setError(null);

    fetch("https://api.github.com/users/tisha1406/repos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch repositories.");
        }
        return response.json();
      })
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="content">
        <ErrorMessage message={error} />

        <button
          className="retry-btn"
          onClick={fetchRepos}
        >
          Retry
        </button>
      </div>
    );
  }

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="content">
      <h1>My GitHub Repositories</h1>

      <input
        type="text"
        placeholder="Search Repository..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="projects-list">
        {filteredRepos.map((repo) => (
          <div key={repo.id} className="project-card">
            <h3>{repo.name}</h3>

            <p>
              ⭐ Stars: <strong>{repo.stargazers_count}</strong>
            </p>

            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
            >
              {repo.html_url}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;