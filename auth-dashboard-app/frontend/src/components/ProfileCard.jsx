function ProfileCard({
  user,
  editMode,
  name,
  setName,
  saving,
  onEdit,
  onSave,
}) {
  return (
    <div
      style={styles.card}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h3 style={styles.title}>User Profile</h3>

      {/* Name */}
      <div style={styles.field}>
        <label style={styles.label}>Name</label>
        {editMode ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        ) : (
          <p style={styles.value}>{user.name}</p>
        )}
      </div>

      {/* Email */}
      <div style={styles.field}>
        <label style={styles.label}>Email</label>
        <p style={styles.value}>{user.email}</p>
      </div>

      {/* Buttons */}
      {editMode ? (
        <button
          onClick={onSave}
          style={styles.save}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.03)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      ) : (
        <button
          onClick={onEdit}
          style={styles.edit}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.03)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Edit Profile
        </button>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "rgba(30,41,59,0.7)",
    backdropFilter: "blur(12px)",
    padding: "30px",
    borderRadius: "14px",
    maxWidth: "420px",
    boxShadow: "0 12px 35px rgba(0,0,0,0.4)",
    color: "white",
    transition: "transform 0.2s ease",
  },

  title: {
    marginBottom: "20px",
    fontSize: "20px",
    fontWeight: "600",
  },

  field: {
    marginBottom: "18px",
  },

  label: {
    fontSize: "12px",
    color: "#94a3b8",
  },

  value: {
    fontSize: "16px",
    marginTop: "5px",
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    marginTop: "5px",
    outline: "none",
  },

  edit: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  save: {
    width: "100%",
    padding: "12px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};

export default ProfileCard;