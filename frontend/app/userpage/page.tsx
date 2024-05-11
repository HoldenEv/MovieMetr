"use client";
import styles from "./userpage.module.css";
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { Tabs, Tab, Box} from '@mui/material';
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import profilePic from "@/_assets/sample_profile_pic.png";
import EditProfileModal from "@/_ui/components/EditProfile/EditProfile";
import { getUserLists, getMovieInfo, addList } from "@/_api/lists";
import { getUser } from "@/_api/editprofile";
import notfound from "@/_assets/NOTFOUND.png";
import { getProfileFromToken } from "@/_api/profile";
import isAuth from "@/protected/protectedRoute";

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

interface MovieList {
  _id: string;
  name: string;
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
  const [newListName, setNewListName] = useState('');

  // this basically is just letting computer know we are in a browser window
  if (typeof window !== "undefined") {
    useEffect(() => {    
        const tokenData = localStorage.getItem("token");
        if (tokenData) {
          // This allows us to parse the token in a usable
          const tokenObject = JSON.parse(tokenData);
          // Hit our profile route 
          getProfileFromToken(tokenObject.token)
          // this allows us to unpack the promise we get from the profile route
                .then(response => {
                  // console.log(response.user.id);
                  console.log("HERE IS THE USER's ID : " + response.user.id); //come back to this
                  fetchUser(response.user.id); // Fetch user data on mount
                  fetchUserListsData(response.user.id);
                })
                .catch(error => {
                    console.error("Error fetching user ID: ", error);
                });
      }
    }, []);
  }


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
  };

  const handleCancelClick = () => {
    setIsCreateListFormVisible(false);
    setNewListName('');
  };

  
  const fetchUser = async (userId: string) => {
    try {
      const data = await getUser(userId); 
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };
  

  const fetchUserListsData = async (userId: string) => {
    try {
      const lists = await getUserLists(userId);
      for (let list of lists) {
        for (let entry of list.entries) {
          const movieInfo = await getMovieInfo(entry.item_id);
          entry.imageUrl = `https://image.tmdb.org/t/p/original${movieInfo.image_path}`
        }
      }
      
      setUserLists(lists);

    } catch (error) {
      console.error("Error fetching user lists", error);
    }
  };


  const handleCreateListSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      const newList = await addList(newListName, user._id); // Replace with your API function and user ID
      setUserLists([...userLists, newList]);
    }
    setIsCreateListFormVisible(false);
    setNewListName('');
  };
  
 
  return (
    <div className={styles.userPage}>
      <div className={styles.userInfo}>
        <div className={styles.photoUsername}>
          <Image
            priority
            src={profilePic} // src={user?.profilePic || profilePic}
            width={500}
            height={500}
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
          <p className={styles.bio}>
          {user?.bio}
          </p>
          <div className={styles.extensions}>
            <button className={styles.editProfile}
              onClick={openEditProfileModal}>Edit Profile
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
            <button className={styles.addMovieList}onClick={handleCreateListClick}>Create List</button>
              {isCreateListFormVisible && (
                <form className={styles.addMovieListForm} onSubmit={handleCreateListSubmit}>
                  <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                  />
                  <button type="submit">Create</button>
                  <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
              )}
            </div>
            {userLists.map((list) => (
              <div key={list._id} className={styles.listContainer}>
                <h2>{list.name}</h2>
                <div className={styles.horizontalScroll}>
                  {list.entries.map((entry, index) => (
                    <div key={index} className={styles.imageItem}>
                      {entry.imageUrl ? (
                        <img
                          src={entry.imageUrl}
                          alt={entry.item_id}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        entry.item_id
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        
      </CustomTabPanel>
    </div>
  );
}

export default isAuth(Userpage);

{/* <div className={styles.gallery}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 1, md: 1 }}
              justifyContent="center"
            >
              {[
                "https://m.media-amazon.com/images/I/61Mde7eiFbL.jpg",
                "https://i5.walmartimages.com/seo/La-La-Land-Movie-Poster-Poster-Print-24-x-36_20f02811-01b4-4aea-9bb2-a79942bd2642_1.856c035d66f8fd216f6d933259bc3dfb.jpeg",
                "https://m.media-amazon.com/images/I/61FzjavGTHL._AC_UF894,1000_QL80_.jpg",
                "https://m.media-amazon.com/images/I/51vQHyG8GOL._AC_UF894,1000_QL80_.jpg",
              ].map((imageUrl, index) => (
                <Grid key={index} xs={6} sm={3} md={2}>
                  <img
                    src={imageUrl}
                    className={styles.galleryItem}
                    alt={`Poster for films`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </div> */}