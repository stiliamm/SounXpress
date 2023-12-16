const Links = () => {
  return (
    <div className="links-container">
      <ul>
        <li className="list">
          <a href="/">
            <span className="icon">
              <ion-icon name="home-outline"></ion-icon>
            </span>
            <span className="text">Home</span>
          </a>
        </li>
        <li className="list">
          <a href="/library">
            <span className="icon">
              <ion-icon name="albums-outline"></ion-icon>
            </span>
            <span className="text">Library</span>
          </a>
        </li>
        <li className="list">
          <a href="/recorder">
            <span className="icon">
              <ion-icon name="mic-outline"></ion-icon>
            </span>
            <span className="text">Recorder</span>
          </a>
        </li>
        <li className="list">
          <a href="/messages">
            <span className="icon">
              <ion-icon name="chatbubbles-outline"></ion-icon>
            </span>
            <span className="text">Messages</span>
          </a>
        </li>
        <li className="list">
          <a href="/profile">
            <span className="icon">
              <ion-icon name="person-outline"></ion-icon>
            </span>
            <span className="text">Profile</span>
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Links;
