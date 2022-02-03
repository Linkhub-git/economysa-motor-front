import React, {useState} from 'react';
import './Header.css';
import Logo from '../../images/fotoEjemplo.jpg';
import HeaderMobile from "./HeaderMobile";
import { Link } from 'react-router-dom';
function Header(hideSidebarDesk,showAlittleSidebar,setShowAlittleSidebar) {
  const [showSpan, setShowSpan] = useState(false)

  async function pruebaPase(){
    showAlittleSidebar(false)
  }
  const {showSideBar1, showSideBar2, setShowSideBar1,render} = HeaderMobile();
  return{
      showSideBar1, 
      showSideBar2,
      setShowSideBar1, 
        render:(
            <header onMouseOver={()=> pruebaPase()} className={hideSidebarDesk === true ? 'header' : "headerSinSidebar"}>
              {render}
              <div className='headerContent' onClick={()=>setShowSpan(!showSpan)}>
                  <img src={Logo} alt="ej" />
                  <div className='headerTextContainer'>
                      <p>Jeferson Cieza</p>
                      <span>Development</span>
                  </div>
              </div>
              {/* Span hide */}
              {showSpan === true ? 
              <div className='containerAllSpanHeaderHide'>
                  <div className='userInformationBackground'>
                      <div className='userInformation'>
                        <img src={Logo} alt="" />
                        <span className='nameHeaderHide'>Olivia Eklund</span>
                        <span className='puestOHeaderHide'>Design</span>
                      </div>
                  </div>
                  <div className='containerLogOut'>
                    <Link className='linkLogOut' to="/login"><button>Sign Out</button></Link>
                  </div>
              </div>
              :
              ""
              }
            </header>
        )
    };
}

export default Header;
