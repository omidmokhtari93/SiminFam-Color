import React from 'react';
import Loading from './UI/Loading/Loading'
import TopNavBar from './UI/Navbar/TopNavBar/TopNavbar'

function App() {
  return (
    <React.Fragment>
      <TopNavBar />
      <Loading show={true} />
    </React.Fragment>
  );
}

export default App;
