"use client";

// import styles from "@/ui/home.module.css";
import React from "react";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 a little unstable
import Userpage from "@/userpage/page";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, display: "flex", height: "100vh", bgcolor: "#22324a" }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          bgcolor: "#22324a",
          minWidth: "50px",
          flex: "0 0 auto",
        }}
      >
        <Tab
          sx={{ color: value === 0 ? "blue" : "white" }}
          icon={<HomeIcon />}
          iconPosition="start"
          label="Home"
          {...a11yProps(0)}
        />
        <Tab
          sx={{ color: value === 1 ? "blue" : "white" }}
          icon={<SearchIcon />}
          iconPosition="start"
          label="Search"
          {...a11yProps(1)}
        />
        <Tab
          sx={{ color: value === 2 ? "blue" : "white" }}
          icon={<ExploreIcon />}
          iconPosition="start"
          label="Explore"
          {...a11yProps(2)}
        />
        <Tab
          sx={{ color: value === 3 ? "blue" : "white" }}
          icon={<ProfileIcon />}
          iconPosition="start"
          label="Profile"
          {...a11yProps(3)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
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
              "https://m.media-amazon.com/images/I/61Mde7eiFbL.jpg",
              "https://i5.walmartimages.com/seo/La-La-Land-Movie-Poster-Poster-Print-24-x-36_20f02811-01b4-4aea-9bb2-a79942bd2642_1.856c035d66f8fd216f6d933259bc3dfb.jpeg",
              "https://m.media-amazon.com/images/I/61FzjavGTHL._AC_UF894,1000_QL80_.jpg",
              "https://m.media-amazon.com/images/I/51vQHyG8GOL._AC_UF894,1000_QL80_.jpg",
              "https://m.media-amazon.com/images/I/61Du1tjXc+L._AC_UF894,1000_QL80_.jpg",
              "https://m.media-amazon.com/images/I/71lqDylcvGL.jpg",
              "https://sportshub.cbsistatic.com/i/2023/12/13/9668ea65-19bf-4953-a416-3e0b7cc8c5e9/kung-fu-panda-4-poster.jpg?auto=webp&width=1200&height=1500&crop=0.8:1,smart",
              "https://m.media-amazon.com/images/I/71kUTilIdiL.jpg",
            ].map((imageUrl, index) => (
              <Grid key={index} xs={6} sm={3} md={2}>
                <img
                  src={imageUrl}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <img
          src="https://previews.123rf.com/images/varijanta/varijanta1604/varijanta160400092/55848272-modern-thin-line-design-concept-for-under-construction-website-background-or-banner-vector.jpg"
          style={{ width: "80%", height: "80%", objectFit: "cover" }}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <img
          src="https://previews.123rf.com/images/varijanta/varijanta1604/varijanta160400092/55848272-modern-thin-line-design-concept-for-under-construction-website-background-or-banner-vector.jpg"
          style={{ width: "80%", height: "80%", objectFit: "cover" }}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Userpage></Userpage>
      </TabPanel>
    </Box>
  );
}
