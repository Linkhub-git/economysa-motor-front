import React, { useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [hideSidebarDesk, setHideSidebarDesk] = useState(true);
  const {showSideBar1, showSideBar2,setShowSideBar1,render} = Header(hideSidebarDesk);
  return (
    <section className="globalContainerContent">
      <Sidebar btnShowSideBar={showSideBar1} btnMiddle={showSideBar2} setShowSideBar={setShowSideBar1} hideSidebarDesk={hideSidebarDesk} setHideSidebarDesk={setHideSidebarDesk} />
      <section className='fondoGeneral'>
        {render}
        <section className="containerHome">
          {showSideBar1 === true ? <div className='backgroundBlackSideBar'></div> : ''}
          <div className='divEspacioHome'><p>...</p></div>
          <div className='infoPrincipal'>
            <div className='infoPrincipalContainer'>
              <h1>Empty Page</h1>
              <p>Use this page to start from scratch and place your custom content.</p>
              <button>Home</button>
            </div>
          </div>        
          <Footer/>
        </section>
      </section>
    </section>
  );
}

export default App;
