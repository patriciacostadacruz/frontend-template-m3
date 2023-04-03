import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <img src="" alt="investMate logo" />
      <p>Copyright C 2023 investMate, Inc</p>
      <div className="footer-links">
        <a
          href="https://www.termsfeed.com/live/3c01a154-ee1b-4016-8366-6b918e4be0f3"
          target="_blank"
          rel="noreferrer"
        >
          Terms and conditions
        </a>
        <a
          href="https://www.termsfeed.com/live/97d08cfc-2879-47a7-8959-6ee79f5d7172"
          target="_blank"
          rel="noreferrer"
        >
          Privacy policy
        </a>
      </div>
    </div>
  );
}

export default Footer;