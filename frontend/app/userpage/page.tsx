"use client";
import "./userpage.css";
import React from "react";
import { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Userpage() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  return (
    <div className="userpage">
      <div className="userinfo">
        <div className="photo-username">
          <img
            src="https://chicagomaroon.com/wp-content/uploads/2021/10/squid-game-900x531.png"
            alt="Profile Picture"
            className="profile-picture"
          />
          <h2 className="username-text">FxrtSniffer690</h2>
        </div>
        <div className="overview-bio">
            <div className="overview">
                <p>300 films</p>
                <p>300 followers</p>
                <p>300 following</p>
            </div>
            <p className="bio">
                Once upon a time there was a lovely princess. But she had an
                enchantment upon her of a fearful sort which could only be broken by
                loves first kiss. She was locked away in a castle guarded by a
                terrible fire-breathing dragon. Many brave knights had attempted to
                free her from this dreadful prison, but non prevailed. She waited in
                the dragons keep in the highest room of the tallest tower for her
                true love and true loves firstkiss. (laughs) Like thats ever gonna
                happen. What a load of - (toilet flush)
            </p>
            <div className="extensions">
              <button className="edit-profile" type="submit">
                Edit Profile
              </button>
              <button className="share-profile" type="submit">
                Share Profile
              </button>
            </div>
        </div>
      </div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ style: { backgroundColor: 'blue' } }}
        >
        <Tab
          label="Favorites"
          {...a11yProps(0)}
          sx={{
            color: value === 0 ? 'blue' : 'white', // Set the text color based on the tab's selection
          }}
        />
        <Tab
          label="Watchlist"
          {...a11yProps(1)}
          sx={{
            color: value === 1 ? 'blue' : 'white',
          }}
        />
        <Tab
          label="Ratings"
          {...a11yProps(2)}
          sx={{
            color: value === 2 ? 'blue' : 'white',
          }}
        />
      </Tabs>

      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="gallery">
        <img
          src="https://m.media-amazon.com/images/I/71lqDylcvGL._AC_UF894,1000_QL80_.jpg"
          className="gallery-item"
        />
        <img
          src="https://i.ebayimg.com/images/g/ACIAAOSwdnphKthz/s-l1200.webp"
          className="gallery-item"
        />
        <img
          src="https://m.media-amazon.com/images/I/71NPmBOdq7L._AC_UF894,1000_QL80_.jpg"
          className="gallery-item"
        />
        <img
          src="https://i.ebayimg.com/images/g/oqwAAOSwy-5bwrx~/s-l1600.jpg"
          className="gallery-item"
        />
      </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <div className="gallery">
      <img
          src="https://m.media-amazon.com/images/I/61Mde7eiFbL.jpg"
          className="gallery-item"
        />
        <img
          src="https://i5.walmartimages.com/seo/La-La-Land-Movie-Poster-Poster-Print-24-x-36_20f02811-01b4-4aea-9bb2-a79942bd2642_1.856c035d66f8fd216f6d933259bc3dfb.jpeg"
          className="gallery-item"
        />
        <img
          src="https://m.media-amazon.com/images/I/61FzjavGTHL._AC_UF894,1000_QL80_.jpg"
          className="gallery-item"
        />
        <img
          src="https://m.media-amazon.com/images/I/51vQHyG8GOL._AC_UF894,1000_QL80_.jpg"
          className="gallery-item"
        />
      </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <p>
          A movie with a really interesting idea and with menacing aliens as enemies. 
          It was mostly fun to watch. Although, it could be a bit messy and rushed sometimes, 
          and had a certain exaggeration at parts.
        </p>

        <p>
          A movie with a really interesting idea and with menacing aliens as enemies. 
          It was mostly fun to watch. Although, it could be a bit messy and rushed sometimes, 
          and had a certain exaggeration at parts.
        </p>

        <p>
          A movie with a really interesting idea and with menacing aliens as enemies. 
          It was mostly fun to watch. Although, it could be a bit messy and rushed sometimes, 
          and had a certain exaggeration at parts.
        </p>
        
      </CustomTabPanel>
    </div>
  );
}

// posssible way to make the array of gallery items clickable links
// <div className="gallery">
//         {galleryItems.map((item, index) => (
//           <a key={index} href={`#link-${index}`} className="gallery-item">
//             <img
//               src={item}
//               alt={`Gallery Item ${index + 1}`}
//               className="gallery-item-img"
//             />
//           </a>
//         ))}
//       </div>
