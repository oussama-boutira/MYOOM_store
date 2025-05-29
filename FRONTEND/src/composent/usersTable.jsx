import React, { useEffect, useState } from "react";
import "../styles/usersTable.css";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/user")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5001/user/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentUser),
      });
      const updated = await res.json();
      setUsers((prev) =>
        prev.map((u) => (u._id === updated._id ? updated : u))
      );
      handleCloseModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`http://localhost:5001/user/${id}`, {
        method: "DELETE",
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Users List</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstname} {user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.role || "User"}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditClick(user)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && currentUser && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={handleCloseModal}>&times;</span>
            <h3>Update User Info</h3>
            <form onSubmit={handleUpdateUser}>
              <input name="firstname" value={currentUser.firstname} onChange={handleInputChange} placeholder="First name" required />
              <input name="lastname" value={currentUser.lastname} onChange={handleInputChange} placeholder="Last name" required />
              <input name="email" value={currentUser.email} onChange={handleInputChange} placeholder="Email" required />
              <select name="role" value={currentUser.role} onChange={handleInputChange}>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Moderator">Moderator</option>
              </select>
              <button type="submit" className="update-btn">Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
