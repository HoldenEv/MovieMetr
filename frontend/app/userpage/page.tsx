import "./userpage.css";

export default function Userpage() {
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
        </div>
      </div>
      <div className="extensions">
        <button className="edit-profile" type="submit">
          Edit Profile
        </button>
        <button className="share-profile" type="submit">
          Share Profile
        </button>
      </div>
      <div className="gallery">
        <img
          src="https://chicagomaroon.com/wp-content/uploads/2021/10/squid-game-900x531.png"
          className="gallery-item"
        />
        <img
          src="https://chicagomaroon.com/wp-content/uploads/2021/10/squid-game-900x531.png"
          className="gallery-item"
        />
        <img
          src="https://chicagomaroon.com/wp-content/uploads/2021/10/squid-game-900x531.png"
          className="gallery-item"
        />
        <img
          src="https://chicagomaroon.com/wp-content/uploads/2021/10/squid-game-900x531.png"
          className="gallery-item"
        />
        <img
          src="https://chicagomaroon.com/wp-content/uploads/2021/10/squid-game-900x531.png"
          className="gallery-item"
        />
        <img
          src="https://chicagomaroon.com/wp-content/uploads/2021/10/squid-game-900x531.png"
          className="gallery-item"
        />
      </div>
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
