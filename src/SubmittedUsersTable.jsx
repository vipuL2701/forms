import React from "react";
import { useSelector } from "react-redux";

const SubmittedUsersTable = () => {
  const submittedUsers = useSelector((state) => state.submittedUsers.users);

  return (
    <div>
      <h2>Submitted Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            {/* Add more table headers for other user data */}
          </tr>
        </thead>
        <tbody>
          {submittedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              {/* Add more table cells for other user data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmittedUsersTable;
