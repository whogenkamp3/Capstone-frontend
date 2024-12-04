import React, { useState } from 'react';
import api from './api';

const Groups = () => {
  const [groupName, setGroupName] = useState('');
  const [groupId, setGroupId] = useState(null);
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const createGroup = async () => {
    try {
      const response = await api.post('groups/', { group_name: groupName });
      setMessage(`Group created successfully with ID: ${response.data.group_id}`);
      setGroupId(response.data.group_id);
    } catch (error) {
      setMessage(`Error creating group: ${error.response?.data || error.message}`);
    }
  };

  const addGroupMember = async () => {
    try {
      const response = await api.post(`groups/${groupId}/add-member/`, null, {
        params: { user_id: userId },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(`Error adding member: ${error.response?.data || error.message}`);
    }
  };

  const removeGroupMember = async () => {
    try {
      const response = await api.post(`groups/${groupId}/remove-member/`, null, {
        params: { user_id: userId },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(`Error removing member: ${error.response?.data || error.message}`);
    }
  };

  const changeGroupName = async (newGroupName) => {
    try {
      const response = await api.post(`groups/${groupId}/change-name/`, {
        group_name: newGroupName,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(`Error changing group name: ${error.response?.data || error.message}`);
    }
  };

  const deleteGroup = async () => {
    try {
      const response = await api.delete(`groups/${groupId}/`);
      setMessage(response.data.message);
      setGroupId(null);
    } catch (error) {
      setMessage(`Error deleting group: ${error.response?.data || error.message}`);
    }
  };

  return (
    <div>
      <h1>Group Management</h1>

      <div>
        <h2>Create Group</h2>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button onClick={createGroup}>Create Group</button>
      </div>

      <div>
        <h2>Manage Group</h2>
        <input
          type="number"
          placeholder="Group ID"
          value={groupId || ''}
          onChange={(e) => setGroupId(e.target.value)}
        />
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={addGroupMember}>Add Member</button>
        <button onClick={removeGroupMember}>Remove Member</button>
        <button onClick={() => changeGroupName(prompt('Enter new group name:'))}>
          Change Group Name
        </button>
        <button onClick={deleteGroup}>Delete Group</button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Groups;
