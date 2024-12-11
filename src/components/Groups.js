import React, { useState, useEffect } from 'react';
import Header from './Header';
import api from '../api';
import styles from './Groups.module.css'; // Importing CSS module

const Groups = () => {
  const [groupName, setGroupName] = useState('');
  const [groupId, setGroupId] = useState('');
  const [userGroups, setUserGroups] = useState([]);
  const [newMemberUserId, setNewMemberUserId] = useState('');
  const [message, setMessage] = useState('');

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    fetchUserGroups();
  }, []);

  const fetchUserGroups = async () => {
    if (!userId) {
      setMessage('User ID is missing.');
      console.log('User ID is missing.');
      return;
    }

    try {
      const response = await api.get('user/groups/', {
        params: { user_id: userId },
      });

      setUserGroups(response.data);
      setMessage('');
    } catch (error) {
      setMessage(`Error fetching user groups: ${JSON.stringify(error.response?.data || error.message)}`);
    }
  };

  const createGroup = async () => {
    if (!userId || !groupName) {
      setMessage('User ID or Group Name is missing.');
      console.log('User ID or Group Name is missing.');
      return;
    }

    try {
      console.log('User ID:', userId);
      console.log('Group Name:', groupName);

      const response = await api.post('create-group/', {
        group_name: groupName,
        members: `${userId}`,
      });

      setMessage(`Group created successfully with ID: ${response.data.group_id}`);
      setGroupId(response.data.group_id);
      fetchUserGroups();
    } catch (error) {
      setMessage(`Error creating group: ${JSON.stringify(error.response?.data || error.message)}`);
    }
  };

  const addGroupMember = async () => {
    if (!groupId || !newMemberUserId) {
      setMessage('Please provide a valid Group ID and New Member User ID.');
      console.log('Group ID or New Member User ID is missing.');
      return;
    }

    try {
      const response = await api.post(`add-group-member/${groupId}/`, null, {
        params: { user_id: newMemberUserId },
      });

      setMessage(response.data.message);
      fetchUserGroups();
    } catch (error) {
      setMessage(`Error adding member: ${JSON.stringify(error.response?.data || error.message)}`);
    }
  };

  return (
    
    <div className={styles.groupsPageContainer}>
      <Header />
      <h1 className={styles.groupsPageTitle}>Group Management</h1>

      <div className={styles.groupsSection}>
        <h2>Your Groups</h2>
        {userGroups.length === 0 ? (
          <p>No groups available.</p>
        ) : (
          <ul className={styles.groupsList}>
            {userGroups.map((group) => (
              <li key={group.group_id} className={styles.groupsListItem}>
                {group.group_name} (ID: {group.group_id})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.groupsSection}>
        <h2>Create Group</h2>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className={styles.groupsInput}
        />
        <button onClick={createGroup} className={styles.groupsButton}>
          Create Group
        </button>
      </div>

      <div className={styles.groupsSection}>
        <h2>Manage Group</h2>
        <input
          type="text"
          placeholder="Group ID"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          className={styles.groupsInput}
        />
        <input
          type="text"
          placeholder="New Member User ID"
          value={newMemberUserId}
          onChange={(e) => setNewMemberUserId(e.target.value)}
          className={styles.groupsInput}
        />
        <button onClick={addGroupMember} className={styles.groupsButton}>
          Add Member
        </button>
      </div>

      {message && <p className={styles.groupsMessage}>{message}</p>}
    </div>
  );
};

export default Groups;











