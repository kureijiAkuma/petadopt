import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GrantAccount() {
  const [usersUID, setUsersUID] = useState([]);

  useEffect(() => {
    // Make API request to fetch all users' UID
    async function fetchUsersUID() {
      try {
        const response = await axios.get('https://console.firebase.google.com/u/1/project/petapp-4e257/authentication/users'); // Replace '/api/users-uid' with the actual endpoint URL
        setUsersUID(response.data);
        console.log("USERSUID:",usersUID);
      } catch (error) {
        console.error('Error fetching users UID:', error);
      }
    }

    fetchUsersUID();
  }, []);

  return (
    <div className="pt-24">
      <h1>All Users UID:</h1>
      <ul>
        {usersUID.map((uid, index) => (
          <li key={index}>{uid}</li>
        ))}
      </ul>
    </div>
  );
}
