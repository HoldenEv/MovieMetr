// UserInfo.js
import Image from "next/image";
import styles from "./UserInfo.module.css"; // Create a new CSS module for this component

interface UserInfoProps {
  username: string | undefined;
  profilePic: string | undefined;
  bio: string | undefined;
  bannerPic: string | undefined;
}

export default function UserInfo({
  username,
  profilePic,
  bio,
  bannerPic,
}: UserInfoProps) {
  return (
    <div>
      <div className={styles.banner}>
        <Image
          src={bannerPic || "/path/to/default/banner.jpg"}
          layout="fill"
          objectFit="cover"
          alt="Banner Picture"
        />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.photoUsername}>
          <Image
            priority
            src={profilePic || "/path/to/default/profile.jpg"}
            width={200}
            height={200}
            alt="Profile Picture"
            className={styles.profilePicture}
          />
          <h2 className={styles.usernameText}>
            {username || "Default Username"}
          </h2>
        </div>
        <div className={styles.overviewBio}>
          <div className={styles.overview}>
            <p>300 films</p>
            <p>300 followers</p>
            <p>300 following</p>
          </div>
          <p className={styles.bio}>{bio || "Default Bio"}</p>
        </div>
      </div>
    </div>
  );
}
