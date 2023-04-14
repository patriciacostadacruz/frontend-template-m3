import { useState } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faBan } from "@fortawesome/free-solid-svg-icons"; 

const EditPassword = ({ onUpdate, onCancel }) => {
	const [passwordForm, setPasswordForm] = useState({
		oldPassword: "",
		password: "",
		passwordConfirmation: ""
	});
	const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

	const handleInputChange = (e) => {
    setPasswordForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

	const handleSubmit = (e) => {
    e.preventDefault();
		if (
      !passwordForm.oldPassword ||
      !passwordForm.password ||
      !passwordForm.passwordConfirmation
    ) {
			toast.error("Please write your old password, and your new password twice.");
			return;
    } 
		if (passwordForm.password !== passwordForm.passwordConfirmation) {
			toast.error("Confirmation password doesn't match the new one chosen.");
			return;
    }
		if (!passwordRegex.test(passwordForm.password)) {
      toast.error(
        "Password must functionhave at least 6 characters and contain at least one number, one lowercase and one uppercase letter."
      );
      return;
    }
		onUpdate(passwordForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Old password</label>
      <input
        type="password"
        value={passwordForm.oldPassword}
        required
        onChange={handleInputChange}
        name="oldPassword"
      />
      <label>New password</label>
      <input
        type="password"
        value={passwordForm.password}
        required
        onChange={handleInputChange}
        name="password"
      />
      <label>Confirm new password</label>
      <input
        type="password"
        value={passwordForm.passwordConfirmation}
        required
        onChange={handleInputChange}
        name="passwordConfirmation"
      />
      <button type="submit">
        <FontAwesomeIcon icon={faFloppyDisk} /> Save password
      </button>
      <button type="button" onClick={onCancel}>
        <FontAwesomeIcon icon={faBan} /> Cancel
      </button>
    </form>
  );
}

export default EditPassword;
