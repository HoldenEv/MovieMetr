"use client";

import styles from "@/ui/home.module.css";
import React from 'react';
import { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import ProfileIcon from '@mui/icons-material/AccountCircle';
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
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, display: 'flex', height: '100vh', bgcolor: '#22324a' }}
        >
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', minWidth: '250px' }}
            >
                <Tab sx={{ color: value === 0 ? "blue" : "white" }} icon={<HomeIcon />} iconPosition="start" label="Home" {...a11yProps(0)} />
                <Tab sx={{ color: value === 1 ? "blue" : "white" }} icon={<SearchIcon />} iconPosition="start" label="Search" {...a11yProps(1)} />
                <Tab sx={{ color: value === 2 ? "blue" : "white" }} icon={<ExploreIcon />} iconPosition="start" label="Explore" {...a11yProps(2)} />
                <Tab sx={{ color: value === 3 ? "blue" : "white" }} icon={<ProfileIcon />} iconPosition="start" label="Profile" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                Hey
            </TabPanel>
            <TabPanel value={value} index={1}>
                Hello
            </TabPanel>
            <TabPanel value={value} index={2}>
                Explore
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Userpage></Userpage>
            </TabPanel>
        </Box>
    );
}


