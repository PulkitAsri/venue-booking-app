import "./navbar.css";

const Navbar = () => {
  const userToken = localStorage.getItem("token");
  const isAdmin = true;
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">VenBooker © 2023</span>
        {!userToken ? (
          <div className="navItems">
            {/* <button className="navButton">Register</button>
            <button className="navButton">Login</button> */}
          </div>
        ) : (
          <div className="navItems">
            <button
              className="navButton"
              onClick={(e) => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Logout
            </button>
            {isAdmin && (
              <button
                className="navButton"
                onClick={(e) => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Admin Portal
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
