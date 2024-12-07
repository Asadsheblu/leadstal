import React, { useEffect, useState } from 'react';

const Dashboard = ({ userId }) => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetch(`/api/subscriptions?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => setSubscriptions(data));
  }, [userId]);

  return (
    <div>
      <h3>Subscribed Emails</h3>
      <ul>
        {subscriptions.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
