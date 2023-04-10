import blueLogoWhiteLetter from "../images/investMate-blue-logo-white letter.png";

const Footer = () => {
  return (
    <div className="footer">
      <img
        height="70"
        className="footer-app-logo"
        src={blueLogoWhiteLetter}
        alt="investMate logo"
      />
      <p>Copyright © 2023 investMate, Inc</p>
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
        <a href="mailto:investmate-admin@gmail.com">Contact</a>
      </div>
    </div>
  );
}

export default Footer;