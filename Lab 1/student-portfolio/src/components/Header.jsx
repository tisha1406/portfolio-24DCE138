function Header({ name, color }) {
  return (
    <header style={{ backgroundColor: color, padding: "20px", color: "white" }}>
      <h1>{name}'s Portfolio</h1>
    </header>
  );
}

export default Header;