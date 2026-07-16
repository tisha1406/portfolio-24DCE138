import "./Header.css";

function Header({ name, color }) {
  return (
    <header className="header" style={{ backgroundColor: `var(--accent, ${color})` }}>
      <h1>{name}'s Portfolio</h1>
    </header>
  );
}

export default Header;