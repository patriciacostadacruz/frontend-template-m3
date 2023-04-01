import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <img src="" alt="investMate logo" />
      <p>Copyright C 2023 investMate, Inc</p>
      <div className="footer-links">
        <Link to="">Privacy policy</Link>
        <Link to="">NDA</Link>
        <Link to="">Contact</Link>
      </div>
    </div>
  );
}

export default Footer;