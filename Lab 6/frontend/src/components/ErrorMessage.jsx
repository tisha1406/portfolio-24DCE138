function ErrorMessage({ message }) {
  return (
    <div
      style={{
        color: "red",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h2>Error</h2>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;