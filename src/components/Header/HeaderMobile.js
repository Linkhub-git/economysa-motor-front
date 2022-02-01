import React, { useState } from 'react';
import './Header.css';
import Logo from '../../images/logo.png'

function HeaderMobile() {
  const [showSideBar1, setShowSideBar1] = useState(false);
  const [showSideBar2, setShowSideBar2] = useState(false);
  const [showSideBar3, setShowSideBar3] = useState(false);
  console.log(showSideBar1);
  return (
    <header className="headerMobile">
      <div className='headerContentMobile'>
            <div className='logoTitleContainerHeader'>
                <img src={Logo} alt="ej" />
                <p>Mirage</p>
            </div>
            <div className='headerBtnContainerMobile'>
              <a href="#" onClick={()=> setShowSideBar1(!showSideBar1)} className={showSideBar1 === false ? "firstLinkHeader" : "firstLinkHeader activeHeader"}> <i className="fas fa-bars"></i></a>
              <a href="#" onClick={()=> setShowSideBar2(!showSideBar2)} className={showSideBar2 === false ? "middleLinkHeader" : "middleLinkHeader activeHeader"}><i className="fas fa-align-right"></i></a>
              <a href="#" onClick={()=> setShowSideBar3(!showSideBar3)} className={showSideBar3 === false ? "lastLinkHeader" : "lastLinkHeader activeHeader"}><i className="fas fa-ellipsis-v"></i></a>
            </div>
      </div>
    </header>
  );
}

export default HeaderMobile;