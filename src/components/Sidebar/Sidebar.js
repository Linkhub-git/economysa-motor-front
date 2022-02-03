import React, { useEffect, useRef, useState } from 'react';
import './Sidebar.css';
import Logo from '../../images/logo.png'
import { Link } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import { gsap } from 'gsap'

function Sidebar(props) {
  
  /* Evento con useEffect para añadir y remover evento para ocultar sideBar */
  const sideBar = useRef();
  const sideBarDesktop = useRef();
  const logoSidebar = useRef();
  useEffect(()=>{
    let handler = (event) =>{
      if(!sideBar.current.contains(event.target)){
        props.setShowSideBar(false)
      }
    }
    document.addEventListener("mousedown", handler);

    return() =>{
      document.removeEventListener("mousedown", handler);
    }
  })
  /* Ocultar & mostrar sidebar */
  async function ChangeStyleSidebar (){
    if(props.hideSidebarDesk === false){
        props.setShowAlittleSidebar(true)
    }else if(props.hideSidebarDesk === true){
      props.setShowAlittleSidebar(false)
    }
  }
  
  async function ChangeStyleSidebarOut (){
    if(props.hideSidebarDesk === false){
      props.setShowAlittleSidebar(false)
    }
  }

  async function hideSidebar(){
    props.setHideSidebarDesk(!props.hideSidebarDesk)
  }
  let background = "#fff000"
  useEffect(()=>{
    gsap.to(props.hideSidebarDesk.current, {
      duration: 1,
      backgroundColor: background,
      ease: "none"
    })
  },[props.showAlittleSidebar])
  /* Tareas para mañana:
  -Pasar el link del Home dentro del desplegable para que al estar activo permanezcan los estilos
  -Ver cómo puedo añadirle una transición cuando se oculta el sidebar (corroborar cómo lo hice en el mobile, ya que hay una transición) */

  console.log(props.showAlittleSidebar);
  return(
    <aside onMouseOver={ChangeStyleSidebar} onMouseOut={ChangeStyleSidebarOut} ref={sideBarDesktop} className={props.hideSidebarDesk === true ? "testSidebar" : "testSidebar sideBarHideDesktop"}>
        <div  className={props.showAlittleSidebar === false ? "testSidebar" : "testSidebar showALittleSidebar"}>
            <div ref={sideBar} className={props.btnShowSideBar === false ? "sidebarContainer" : "sidebarContainer activeShow"}>
                  <div ref={logoSidebar} className={props.showAlittleSidebar === false ? "iconTitleSideBar" : "iconTitleSideBar showALittleSidebarLogo"}>
                      <Link className={props.hideSidebarDesk === true ? "linkHeaderSidebar" : "linkHeaderSidebar sideBarHideDesktopMoveLogo"} to="/">
                          <img src={Logo} alt="Logo" />
                          <span>Economysa</span>
                      </Link>
                      <button className={props.hideSidebarDesk === true ? "" : "sideBarHideDesktopHideButton"} onClick={() => hideSidebar()}><i className={props.hideSidebarDesk === true ? "fas fa-lock" : "fas fa-lock-open"}></i></button>
                  </div>
                  <div className='linksContainer'>
                      <Link className='linkSidebar' to="/">Dasboard <i className="fas fa-home"></i></Link>
                          <Accordion>
                              <Accordion.Item eventKey="0" className={props.showAlittleSidebar === false ? "contentContainerLink" : "contentContainerLink hideArrowSidebar"}>
                                  <Accordion.Header className={props.hideSidebarDesk === true ? "titleLink" : "titleLink sideBarHideDesktopIcons"}>Dashoard <i className="fas fa-lock lockLink"></i></Accordion.Header>
                              </Accordion.Item>
                              <Accordion.Item eventKey="1" className={props.showAlittleSidebar === false ? "contentContainerLink" : "contentContainerLink hideArrowSidebar"}>
                                  <Accordion.Header className={props.hideSidebarDesk === true ? "titleLink" : "titleLink sideBarHideDesktopIcons"}>Seguridad <i className="fas fa-lock lockLink"></i></Accordion.Header>
                                      <Accordion.Body className='contentInsideLink'>
                                          <div className="individualLinkContainer">
                                            <Link to="/Seguridad" className='linkBar'>Usuario <i className="fas fa-users"></i></Link>
                                          </div>
                                      </Accordion.Body>
                              </Accordion.Item>
                              <Accordion.Item eventKey="2" className={props.showAlittleSidebar === false ? "contentContainerLink" : "contentContainerLink hideArrowSidebar"}>
                                  <Accordion.Header  className={props.hideSidebarDesk === true ? "titleLink" : "titleLink sideBarHideDesktopIcons"}>Motor <i className="fas fa-globe-americas"></i></Accordion.Header>
                                      <Accordion.Body className='contentInsideLink'>
                                          <div className="individualLinkContainer">
                                            <Link to="/motor/1" className='linkBar'>Clientes<i className="fas fa-list-ul"></i></Link>
                                          </div>
                                          <div className="individualLinkContainer">
                                            <Link to="/motor/2" className='linkBar'>Direcciones Entrega <i className="fas fa-folder"></i></Link>
                                          </div>
                                          <div className="individualLinkContainer">
                                            <Link to="/" className='linkBar'>Productos <i className="fas fa-bookmark"></i></Link>
                                          </div>
                                          <div className="individualLinkContainer">
                                            <Link to="/" className='linkBar'>Mecánicas <i className="fas fa-bookmark"></i></Link>
                                          </div>
                                          <div className="individualLinkContainer">
                                            <Link to="/" className='linkBar'>Proveedores <i className="fas fa-bookmark"></i></Link>
                                            
                                          </div>
                                          <div className="individualLinkContainer">
                                            <Link to="/" className='linkBar'>Vendedores <i className="fas fa-bookmark"></i></Link>
                                          </div>
                                      </Accordion.Body>
                              </Accordion.Item>
                          </Accordion>
                  </div>
              </div>
        </div>
    </aside>
  );
}

export default Sidebar;
