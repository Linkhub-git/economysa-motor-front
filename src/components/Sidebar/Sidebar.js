import React, { useEffect, useRef, useState } from 'react';
import './Sidebar.css';
import Logo from '../../images/logo.png'
import { Link } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';

function Sidebar(props) {
  
  //const [hideSidebarDesk, setHideSidebarDesk] = useState(true)
  /* Evento con useEffect para añadir y remover evento para ocultar sideBar */
  const sideBar = useRef();
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
  /* Al esconder el sideBar para desk simplemente debo jugar con esconder una parte.
  Cosa que cuando se pase el mouse por encima, se muestre el contenido.


  Luego, por otra parte, lo que tengo que hacer es jugar con los eventos onClick para dejar de manera
  fija el sidebar, eso se puede hacer añadiendo clases para alterar el position absolute
  Simplemente es cuestión de añadir o remover el position absolute, luego ver el evento onMouse o hover 
  
  Para pasar la información de si el sidebar está oculto o no, al padre, definir un estado y una
  función DESDE EL PADRE, y recibir el dato actualizado del hijo, para trabajar en base a ello
  
  Tengo que trabajar en la clase para ocultar la flecha del sidebar, y ya puedo encargarme
  de adaptar el resto de la página
  Como mencioné antes, una vez tenga ocultos las flechas, */
  console.log(props.hideSidebarDesk);
  console.log(props.setHideSidebarDesk);
  return(
    <aside className={props.hideSidebarDesk === true ? "" : "sideBarHideDesktop"}>
          <div ref={sideBar} className={props.btnShowSideBar === false ? "sidebarContainer" : "sidebarContainer activeShow"}>
            <div className='iconTitleSideBar'>
                <Link className={props.hideSidebarDesk === true ? "linkHeaderSidebar" : "linkHeaderSidebar sideBarHideDesktopMoveLogo"} to="/">
                    <img src={Logo} alt="Logo" />
                    <span>Economysa</span>
                </Link>
              <button className={props.hideSidebarDesk === true ? "" : "sideBarHideDesktopHideButton"} onClick={() => props.setHideSidebarDesk(!props.hideSidebarDesk)}><i className={props.hideSidebarDesk === true ? "fas fa-lock" : "fas fa-lock-open"}></i></button>
            </div>
            <div className='linksContainer'>
                <Link className='linkSidebar' to="/">Dasboard <i className="fas fa-home"></i></Link>
                    <Accordion>
                        <Accordion.Item eventKey="0" className='contentContainerLink'>
                            <Accordion.Header className={props.hideSidebarDesk === true ? "titleLink" : "titleLink sideBarHideDesktopIcons"}>Seguridad <i className="fas fa-lock lockLink"></i></Accordion.Header>
                                <Accordion.Body className='contentInsideLink'>
                                    <div className="individualLinkContainer">
                                      <Link to="/Seguridad" className='linkBar'>Usuario <i className="fas fa-users"></i></Link>
                                    </div>
                                </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1" className='contentContainerLink'>
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
    </aside>
  );
}

export default Sidebar;
