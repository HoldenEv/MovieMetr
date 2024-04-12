import styles from "./editProfileModal.module.css";
import Image from "next/image";
import closeIcon from "@/_assets/close.svg";
import ReactModal from "react-modal";
import { useState } from "react";

interface EditProfileModalProps {
  isOpen: boolean;
  setOpenState: (state: boolean) => void;
}

export default function EditProfileModal({ isOpen, setOpenState }: EditProfileModalProps) {
  const handleClick = () => {
    setOpenState(false);
  };

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    bio: "",
    profilePic: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Call a function to update the user profile with formData
    // Example: updateUserProfile(formData)
    // Close the modal after updating profile
    setOpenState(false);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      overlayClassName={styles.modalOverlay}
      className={styles.modalContainer}
    >
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div>
          <div className={styles.closeButtonContainer}>
            <button onClick={handleClick} className={styles.closeButton}>
              <Image
                priority
                src={closeIcon}
                width={30}
                alt="Close edit profile modal"
                className={styles.closeIcon}
              ></Image>
            </button>
          </div>
          <h1 className={styles.head}>Edit Profile</h1>
          <div className={styles.formRow}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className={styles.formTextarea}
            />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="profilePic">Profile Picture URL</label>
            <input
              type="text"
              id="profilePic"
              name="profilePic"
              value={formData.profilePic}
              onChange={handleChange}
              className={styles.formInput}
            />
          </div>
          <div className={styles.loginBottomButtons}>
            <button className={styles.updateProfileButton} type="submit">
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </ReactModal>
  );
}
