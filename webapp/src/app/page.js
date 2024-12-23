/*
This will be the Landing page for our app
*/
'use client';
// Importing Navbar component
import Navbar from './components/Navbar';

const Home = () => {
  return (
    <>
    <Navbar/>
    <div className='main'>
      <h1>What's next?</h1>
    </div>
    </>
  );
};

export default Home;
