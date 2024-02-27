import "./userpage.css";

export default function Userpage() {
  return (
    <div className="userpage">
        <div className="userinfo">
            <div>
                <img 
                    src="https://chicagomaroon.com/wp-content/uploads/2021/10/squid-game-900x531.png" 
                    alt="Profile Picture" 
                    className="profile-picture" 
                />
            </div>
            <div className="username">
                <p className="username-text">FxrtSniffer690</p>
                <div className="overview">
                    <p>300 films</p>
                    <p>300 followers</p>
                    <p>300 following</p>
                </div>
            </div>
        </div>
        <div className="gallery">
            <img src="https://chicagomaroon.com/wp-content/uploads/2021/10/squid-game-900x531.png" className="gallery-item"/>
            <img src="https://chicagomaroon.com/wp-content/uploads/2021/10/squid-game-900x531.png" className="gallery-item"/>
            <img src="https://chicagomaroon.com/wp-content/uploads/2021/10/squid-game-900x531.png" className="gallery-item"/>
            <img src="https://chicagomaroon.com/wp-content/uploads/2021/10/squid-game-900x531.png" className="gallery-item"/>
            <img src="https://chicagomaroon.com/wp-content/uploads/2021/10/squid-game-900x531.png" className="gallery-item"/>
            <img src="https://chicagomaroon.com/wp-content/uploads/2021/10/squid-game-900x531.png" className="gallery-item"/>
        </div>
    </div>




  )
}

