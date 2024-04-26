import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { DB } from "../firebase";

export default function GrantAccount() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(DB, "users"));
        const usersArray = [];
        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          const user = {
            id: doc.id,
            username: userData.username,
            level: userData.level,
          };
          usersArray.push(user);
        });
        setUsers(usersArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleLevelChange = async (userId, newLevel) => {
    try {
      await updateDoc(doc(DB, "users", userId), {
        level: newLevel,
      });
      // Update the local state to reflect the change
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, level: newLevel } : user
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-24">
      <table className="border-separate border-spacing-y-12 border-spacing-x-20 border border-black rounded-md mb-6">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>
                <select
                  value={user.level}
                  onChange={(e) => handleLevelChange(user.id, e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
