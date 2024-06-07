import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { getUserLists, addMovieToList } from "@/_api/lists";
import styles from "./userlists.module.css";

interface AddToListModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  movieId: string;
}

const AddToListModal: React.FC<AddToListModalProps> = ({
  isOpen,
  onClose,
  userId,
  movieId,
}) => {
  const [userLists, setUserLists] = useState<{ _id: string; name: string }[]>(
    [],
  );
  const [selectedLists, setSelectedLists] = useState<string[]>([]);

  useEffect(() => {
    if (userId) {
      fetchUserListsData(userId);
    }
  }, [userId]);

  const fetchUserListsData = async (userId: string) => {
    try {
      const lists = await getUserLists(userId);
      setUserLists(lists);
    } catch (error) {
      console.error("Error fetching user lists:", (error as Error).message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedLists([...selectedLists, e.target.value]);
    } else {
      setSelectedLists(selectedLists.filter((id) => id !== e.target.value));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      for (const listId of selectedLists) {
        await addMovieToList(listId, movieId);
      }
      onClose();
    } catch (error) {
      console.error("Error adding movie to lists:", (error as Error).message);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className={styles.modalOverlay}
    >
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <label>Select lists:</label>
          {userLists.map((list) => (
            <div key={list._id}>
              <input
                type="checkbox"
                id={list._id}
                value={list._id}
                checked={selectedLists.includes(list._id)}
                onChange={handleChange}
              />
              <label htmlFor={list._id}>{list.name}</label>
            </div>
          ))}
          <div className={styles.BottomButtons}>
            <button type="submit" className={styles.SaveButton}>
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.CancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default AddToListModal;
