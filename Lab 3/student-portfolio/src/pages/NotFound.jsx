import "../components/NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Looks like you're lost — but it's okay, it happens! 🚀</p>
      <button className="btn-home" onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
}

export default NotFound;