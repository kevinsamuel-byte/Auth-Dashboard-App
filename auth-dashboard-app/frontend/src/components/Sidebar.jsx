function Sidebar({ onLogout }) {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>My App</h2>

      {/* Navigation */}
      <div style={styles.nav}>
        <p
          style={styles.navItem}
          onMouseOver={(e) => {
            e.target.style.background = "#1e293b";
            e.target.style.color = "white";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "#94a3b8";
          }}
        >
          Dashboard
        </p>

        <p
          style={styles.navItem}
          onMouseOver={(e) => {
            e.target.style.background = "#1e293b";
            e.target.style.color = "white";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "#94a3b8";
          }}
        >
          Profile
        </p>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        style={styles.logout}
        onMouseOver={(e) => {
          e.target.style.opacity = "0.8";
          e.target.style.transform = "scale(1.02)";
        }}
        onMouseOut={(e) => {
          e.target.style.opacity = "1";
          e.target.style.transform = "scale(1)";
        }}
      >
        Logout
      </button>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    background: "rgba(15,23,42,0.9)",
    backdropFilter: "blur(10px)",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    color: "white",
    borderRight: "1px solid rgba(255,255,255,0.05)",
  },

  logo: {
    marginBottom: "30px",
    fontSize: "22px",
    fontWeight: "bold",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  navItem: {
    padding: "10px",
    borderRadius: "6px",
    color: "#94a3b8",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  logout: {
    marginTop: "auto",
    padding: "10px",
    background: "#dc2626",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};

export default Sidebar;