// export default EditProfileModal;
import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { updateUser } from "@/_api/editprofile";
import styles from "./editprofile.module.css";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: any; // Assuming you have access to the user's ID
  user: any;
  refreshUserData: any;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  userId,
  user,
  refreshUserData,
}) => {
  const [formData, setFormData] = useState({
    email: user?.email || "",
    username: user?.username || "",
    bio: user?.bio || "",
    // Add more fields as needed
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
      refreshUserData();
    } catch (error: any) {
      console.error("Error updating profile:", error.message);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className={styles.modalOverlay}
    >
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
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
            <button type="submit" className={styles.editProfileButton}>
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.editProfileButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default EditProfileModal;
