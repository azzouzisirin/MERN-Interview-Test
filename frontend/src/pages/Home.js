import React from 'react';
import DrawingList from '../components/DrawingList';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the Whiteboard App</h1>
      <p>Manage your drawings and create new ones!</p>
      <DrawingList />
    </div>
  );
};

export default Home;
