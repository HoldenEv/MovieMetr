import React, { useState } from "react";
import ReactModal from "react-modal";
import { updateUser } from "@/_api/editprofile";
import styles from "./editprofile.module.css";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string; // Assuming you have access to the user's ID
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    bio: "",
    // Add more fields as needed
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updateUser(userId, formData);
      console.log("Profile updated:", response);
      onClose(); 
    } catch (error: any) {
      console.error("Error updating profile:", error.message);
    }
  };

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <div className={styles.modalOverlay}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.formInput}
            />

            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={styles.formInput}
            />

            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className={styles.formInput}
            />

            <div className={styles.loginBottomButtons}>
              <button type="submit" className={styles.createAccountButton}>Save Changes</button>
              <button type="button" onClick={onClose} className={styles.createAccountButton}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </ReactModal>
  );
};

export default EditProfileModal;
