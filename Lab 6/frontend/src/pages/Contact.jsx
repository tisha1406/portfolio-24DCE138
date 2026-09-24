import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [message, setMessage] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="content">
      <h1>Contact Me</h1>

      <div className="contact-form">
        <label>Enter Your Message:</label>

        <input
          type="text"
          placeholder="Type here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <p>
          <strong>You Typed:</strong> {message}
        </p>

        <p className="char-count">Character Count: {message.length}</p>

        <div className="contact-actions">
          <button onClick={() => setShowHelp(!showHelp)} className="btn-primary">
            {showHelp ? "Hide Help" : "Show Help"}
          </button>
        </div>

        {showHelp && (
          <div className="help-tooltip">
            <p>
              Please enter your message. It will update instantly as you type.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;