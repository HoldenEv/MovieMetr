"use client";
import styles from "./sidebar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import Logo from "@/_assets/logo2.png";
import Image from "next/image";

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <Image src={Logo} alt="logo" width={100} height={80} />
          {/* <span>MovieMeter</span>   */}
        </div>
      </div>

      <ul>
        <li>
          <a href="/">
            <div className={styles.icon}>
              <HomeIcon></HomeIcon>
            </div>
            <span className={styles.navitem}>Home</span>
          </a>
        </li>
        <li>
          <a href="/search">
            <div className={styles.icon}>
              <SearchIcon></SearchIcon>
            </div>

            <span className={styles.navitem}>Search</span>
          </a>
        </li>
        <li>
          <a href="#">
            <div className={styles.icon}>
              <ExploreIcon></ExploreIcon>
            </div>
            <span className={styles.navitem}>Explore</span>
          </a>
        </li>
        <li>
          <a href="/userpage">
            <div className={styles.icon}>
              <ProfileIcon></ProfileIcon>
            </div>
            <span className={styles.navitem}>Profile</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
