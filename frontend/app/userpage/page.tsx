"use client";
import styles from "./userpage.module.css";
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { Tabs, Tab, Box } from "@mui/material";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import profilePic from "@/_assets/sample_profile_pic.png";
import bannerPic from "@/_assets/sample_banner_pic.jpg";
import EditProfileModal from "@/_ui/components/User/EditProfile/EditProfile";
import { getUserLists, getMovieInfo, addList, deleteList } from "@/_api/lists";
import { getUser } from "@/_api/editprofile";
import notfound from "@/_assets/NOTFOUND.png";
import { getProfileFromToken } from "@/_api/profile";
import isAuth from "@/protected/protectedRoute";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import Link from "next/link";

// interface for the user
interface User {
  _id: string;
  username: string;
  email: string;
  profilepath: string;
  bio: String;
}

// interface for the tabs
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

//interface for the movielist
interface MovieList {
  _id: string;
  name: string;
  description: string;
  entries: { itemType: string; item_id: string; imageUrl?: string }[];
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

// each tab has a name - component pair
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Userpage = () => {
  const [value, setValue] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [userLists, setUserLists] = useState<MovieList[]>([]);
  const [isCreateListFormVisible, setIsCreateListFormVisible] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [isListEditing, setIsListEditing] = useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const openEditProfileModal = () => {
    setIsEditProfileOpen(true);
  };

  const closeEditProfileModal = () => {
    setIsEditProfileOpen(false);
  };

  const handleCreateListClick = () => {
    setIsCreateListFormVisible(true);
    setIsListEditing(false);
  };

  const handleCancelClick = () => {
    setIsCreateListFormVisible(false);
    setNewListName("");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenData = localStorage.getItem("token");
      if (tokenData) {
        // This allows us to parse the token in a usable format
        const tokenObject = JSON.parse(tokenData);
        // Hit our profile route
        getProfileFromToken(tokenObject.value.token)
          // this allows us to unpack the promise we get from the profile route
          .then((response) => {
            // console.log(response.user.id);
            console.log("HERE IS THE USER's ID : " + response.user.id); //come back to this
            fetchUser(response.user.id); // Fetch user data on mount
            fetchUserListsData(response.user.id);
          })
          .catch((error) => {
            console.error("Error fetching user ID: ", error);
          });
      }
    }
  }, []);

  const actions = [
    {
      icon: <AddIcon />,
      name: "Create List",
      onClick: handleCreateListClick,
    },
    {
      icon: <EditIcon />,
      name: "Edit List",
      onClick: () => {
        setIsListEditing(true);
      },
    },
    {
      icon: <CancelIcon />,
      name: "Cancel",
      onClick: () => {
        setIsListEditing(false);
      },
    },
  ];

  const fetchUser = async (userId: string) => {
    try {
      const data = await getUser(userId);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const refreshUserData = () => {
    if (user) {
      fetchUser(user._id);
      fetchUserListsData(user._id);
    }
  };

  const fetchUserListsData = async (userId: string) => {
    try {
      const lists = await getUserLists(userId);
      for (let list of lists) {
        for (let entry of list.entries) {
          const movieInfo = await getMovieInfo(entry.item_id);
          entry.imageUrl = `https://image.tmdb.org/t/p/original${movieInfo.image_path}`;
        }
      }
      setUserLists(lists);
    } catch (error) {
      console.error("Error fetching user lists", error);
    }
  };

  const handleCreateListSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (user) {
      const newList = await addList(newListName, user._id);
      setUserLists([...userLists, newList]);
    }
    setIsCreateListFormVisible(false);
    setNewListName("");
  };

  const handleDeleteListClick = async (listId: string) => {
    await deleteList(listId);
    refreshUserData();
    setIsListEditing(false);
  };

  return (
    <div className={styles.userPage}>
      <div className={styles.banner}>
        <Image
          src={bannerPic} // src={user?.bannerPic || defaultBannerPic}
          layout="fill"
          objectFit="cover"
          alt="Banner Pictrue"
        />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.photoUsername}>
          <Image
            priority
            src={profilePic} // src={user?.profilePic || profilePic}
            width={200}
            height={200}
            alt="Profile Picture"
            className={styles.profilePicture}
          />
          <h2 className={styles.usernameText}>{user?.username}</h2>
        </div>
        <div className={styles.overviewBio}>
          <div className={styles.overview}>
            <p>300 films</p>
            <p>300 followers</p>
            <p>300 following</p>
          </div>
          <p className={styles.bio}>{user?.bio}</p>
          <div className={styles.extensions}>
            <button
              className={styles.editProfile}
              onClick={openEditProfileModal}
            >
              Edit Profile
            </button>
            <button className={styles.shareProfile} type="submit">
              Share Profile
            </button>
          </div>
          {isEditProfileOpen && (
            <EditProfileModal
              isOpen={isEditProfileOpen}
              onClose={closeEditProfileModal}
              userId={user?._id}
              user={user}
              refreshUserData={refreshUserData}
            />
          )}
        </div>
      </div>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: "white" } }}
          sx={{ borderBottom: 0.5, borderColor: "white" }}
        >
          <Tab
            label="Movie Lists"
            {...a11yProps(0)}
            sx={{
              color: value === 0 ? "white" : "white", // Set the text color based on the tab's selection
            }}
          />
          <Tab
            label="Watchlist"
            {...a11yProps(1)}
            sx={{
              color: value === 1 ? "white" : "white",
            }}
          />
          <Tab
            label="Ratings"
            {...a11yProps(2)}
            sx={{
              color: value === 2 ? "white" : "white",
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className={styles.movieLists}>
          <div className={styles.movieButtons}>
            <div>
              <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                direction="right"
                icon={<SpeedDialIcon />}
                className={styles.SpeedDial}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.onClick}
                  />
                ))}
              </SpeedDial>
            </div>
            {isCreateListFormVisible && (
              <form
                className={styles.addMovieListForm}
                onSubmit={handleCreateListSubmit}
              >
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                />
                <button type="submit">Create</button>
                <button type="button" onClick={handleCancelClick}>
                  Cancel
                </button>
              </form>
            )}
          </div>
          {userLists.map((list) => (
            <div key={list._id} className={styles.listContainer}>
              <div className={styles.scrollContainer}>
                {isListEditing && (
                  <div className={styles.listOverlay}>
                    <button onClick={() => handleDeleteListClick(list._id)}>
                      Delete
                    </button>
                  </div>
                )}
                {list.entries.map((entry, index) => (
                  <div key={index} className={styles.imageItem}>
                    {entry.imageUrl ? (
                      <Image
                        width={200}
                        height={200}
                        src={entry.imageUrl}
                        alt={entry.item_id}
                        style={{
                          width: "75%",
                          height: "75%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      entry.item_id
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.listInfo}>
                <div className={styles.listName}>
                  <Link href={`/movielist/${list._id}`}>
                    <h2>{list.name}</h2>
                  </Link>
                </div>
                <p>{list.entries.length} movies</p>
                <p>{list.description.substring(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}></CustomTabPanel>
      <CustomTabPanel value={value} index={2}></CustomTabPanel>
    </div>
  );
};

export default isAuth(Userpage);
