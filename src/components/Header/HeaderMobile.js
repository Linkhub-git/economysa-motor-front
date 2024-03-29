import React, { useState } from 'react';
import './Header.css';
import Logo from '../../images/logo.png'
import Graphic from '../../images/barsHeader.svg'
import { Accordion } from 'react-bootstrap';
function HeaderMobile() {
  const [showSideBar1, setShowSideBar1] = useState(false);
  const [showSideBar2, setShowSideBar2] = useState(false);
  const [showSideBar3, setShowSideBar3] = useState(false);
  const [showGraphics, setShowGraphics] = useState(false);
  /* Utilizar acá el showSideBar3, que es el que muestra el span en versión mobile 
  En la versión mobile tiene también un pequeño span, utilizar como base el que hice antes
  ya que es modificar y agregar menos cosas*/
  console.log(showGraphics);
  return {
    showSideBar1, 
    showSideBar2, 
    setShowSideBar1,
    render:(
      <header className="headerMobile">
        <div className='headerContentMobile'>
              <div className='logoTitleContainerHeader'>
                  <img src={Logo} alt="ej" />
                  <p>Mirage</p>
              </div>
              <div className='headerBtnContainerMobile'>
                <a href="#" onClick={()=> setShowSideBar1(!showSideBar1)} className={showSideBar1 === false ? "firstLinkHeader" : "firstLinkHeader activeHeader"}> <i className="fas fa-bars"></i></a>
                <a href="#" onClick={()=> setShowSideBar2(!showSideBar2)} className={showSideBar2 === false ? "middleLinkHeader" : "middleLinkHeader activeHeader"}><i className="fas fa-align-right"></i></a>
                <a href="#" onClick={()=> setShowSideBar3(!showSideBar3)} className={showSideBar3 === false ? "lastLinkHeader" : "lastLinkHeader activeHeader activeLasLink"}><i className="fas fa-ellipsis-v"></i></a>
              </div>
        </div>
        <div className={showSideBar3 === true ? "spanMobile" : "spanMobileHide"}>
            <div className='espacioVacioHeader'></div>
            <div onClick={()=> setShowGraphics(!showGraphics )} className='spanMobileContainer'>
                  <img src={Logo} alt="" />
                  <h1>Olivia Eklund</h1>
                  <span>Design</span>  
            </div>
            <div className='graphicSpanHeaderContainer'>
                <div className='bannerGraphicHeader'>
                    <div className='weeklyPerfomanceContainer'>
                        <p>Weekly Performance</p>
                        <img src={Graphic} alt="" />
                    </div>
                    <div className='userInformationSpanMobile'>
                        <img src={Logo} alt="" />
                        <h1 className='nameHeaderHideSpanMobile'>Olivia Eklund</h1>
                        <span className='puestOHeaderHideSpanMobile'>Design</span>
                    </div>
                </div>
                <div className='prueba'>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                              <i className="fas fa-list-ul"></i>
                              <div className='asddsa'>
                                <span className='titleListGraphics'>Tasks</span>
                                <span className='subTitleListGraphics'>3 open issues</span>
                              </div>
                            </Accordion.Header>
                              <Accordion.Body>...</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                              <Accordion.Body>
                                Lorem ipsum 
                              </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                              <Accordion.Body>
                                Lorem ipsum 
                              </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </div>
      </header>
    )
  };
}

export default HeaderMobile;