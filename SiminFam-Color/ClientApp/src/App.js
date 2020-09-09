import React from 'react';
import Logo from './UI/Logo/Logo'
import Loading from './UI/Loading/Loading'

function App() {
  return (
    <React.Fragment>
      <Logo />
      <Loading show={true}/>
    </React.Fragment>
  );
}

export default App;
