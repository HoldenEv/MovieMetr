"use client";
import styles from "./userpage.module.css";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 a little unstable
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import profilePic from "@/_assets/sample_profile_pic.png";
import axios from "axios";
import EditProfileModal from "@/_ui/components/EditProfile/EditProfile";

// {user && (
//   <div>
//     <Image
//       priority
//       src={user.profilepath} // Assuming user object contains profile picture path
//       width={500}
//       height={500}
//       alt="Profile Picture"
//     />


interface User {
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
          <Typography>{children}</Typography>
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// handle tab changes and other userPage canges
export default function Userpage() {
  const [value, setValue] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const openEditProfileModal = () => {
    setIsEditProfileOpen(true);
  };

  const closeEditProfileModal = () => {
    setIsEditProfileOpen(false);
  };

  useEffect(() => {
    const userId = '66144b298785154f407541ca';
    fetchUser(userId); // Fetch user data on mount
  }, []);

  const fetchUser = (userId: string) => {
    // Make API call to fetch user data
    fetch(`http://localhost:3001/authentication/getUser?userId=${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error("Error fetching user data", error));
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
              userId={'66144b298785154f407541ca'}
            />
          )}
        </div>
      </div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          TabIndicatorProps={{ style: { backgroundColor: "blue" } }}
          sx={{ borderBottom: 1, borderColor: "white" }}
        >
          <Tab
            label="Favorites"
            {...a11yProps(0)}
            sx={{
              color: value === 0 ? "blue" : "white", // Set the text color based on the tab's selection
            }}
          />
          <Tab
            label="Watchlist"
            {...a11yProps(1)}
            sx={{
              color: value === 1 ? "blue" : "white",
            }}
          />
          <Tab
            label="Ratings"
            {...a11yProps(2)}
            sx={{
              color: value === 2 ? "blue" : "white",
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className={styles.gallery}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 1, md: 1 }}
              justifyContent="center"
            >
              {[
                "https://image.tmdb.org/t/p/original/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
                "https://i.ebayimg.com/images/g/ACIAAOSwdnphKthz/s-l1200.webp",
                "https://m.media-amazon.com/images/I/71NPmBOdq7L._AC_UF894,1000_QL80_.jpg",
                "https://i.ebayimg.com/images/g/oqwAAOSwy-5bwrx~/s-l1600.jpg",
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
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className={styles.gallery}>
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
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className={styles.gallery}>
          <Box sx={{ borderBottom: 1, border: "divider", marginBottom: 1 }}>
            <p>
              A movie with a really interesting idea and with menacing aliens as
              enemies. It was mostly fun to watch. Although, it could be a bit
              messy and rushed sometimes, and had a certain exaggeration at
              parts.
            </p>
          </Box>
          <Box sx={{ borderBottom: 1, border: "divider", marginBottom: 1 }}>
            <p>
              A movie with a really interesting idea and with menacing aliens as
              enemies. It was mostly fun to watch. Although, it could be a bit
              messy and rushed sometimes, and had a certain exaggeration at
              parts.
            </p>
          </Box>
          <Box sx={{ borderBottom: 1, border: "divider", marginBottom: 1 }}>
            <p>
              A movie with a really interesting idea and with menacing aliens as
              enemies. It was mostly fun to watch. Although, it could be a bit
              messy and rushed sometimes, and had a certain exaggeration at
              parts.
            </p>
          </Box>
        </div>
      </CustomTabPanel>
    </div>
  );
}
