import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './Seguridad.css';
import { Form, Table, Pagination, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Seguridad() {
  const [hideSidebarDesk, setHideSidebarDesk] = useState(true);
  const [showAlittleSidebar, setShowAlittleSidebar] = useState(false);
  const {showSideBar1, showSideBar2,setShowSideBar1,render} = Header("",setShowAlittleSidebar, showAlittleSidebar);
  
  return (
    <section className="globalContainerContent">
      <Sidebar numberActiveSidebar="1" btnShowSideBar={showSideBar1} btnMiddle={showSideBar2} setShowSideBar={setShowSideBar1} hideSidebarDesk={hideSidebarDesk} setHideSidebarDesk={setHideSidebarDesk} showAlittleSidebar={showAlittleSidebar} setShowAlittleSidebar={setShowAlittleSidebar}/>
      <section className={hideSidebarDesk === true ? "fondoGeneral" : "fondoGeneral contentHideSidebarSeguridad"}>
        {render}
        <div className='divEspacioHome'><p>...</p></div>
        <div className='infoPrincipalSeguridadYMotor'>
            <section className='infoListadoUsuarioContainer'>
                <h2>Listado de Usuarios</h2>
                <div className='filtradoBusquedaContainer'>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Filtros de Búsqueda</Accordion.Header>
                                <Accordion.Body>
                                  <div className='formularioContainerAll'>
                                      <Form className='formularioContainer'>
                                        <Form.Group className="mb-3 inputUsuario" controlId="formBasicEmail">
                                          <Form.Control type="text" placeholder="Nombres" />
                                        </Form.Group>

                                        <Form.Group className="mb-3 inputUsuario" controlId="formBasicPassword">
                                          <Form.Control type="email" placeholder="Correo electrónico" />
                                        </Form.Group>
                                        <button className='btn-search'>Buscar</button>
                                      </Form>
                                  </div>
                                  <p className='textRegistrosEncontrados'>registro(s) encontrados</p>
                                </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                  </div>
                  


            </section>
        </div>
        <section className='tableContainer'>
          <div className='tableContent'>
          <button className='btn-new'><Link className='linkBtn-new' to="/Seguridad/create-user"><i className="fas fa-plus"></i> Nuevo</Link></button>
                <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Roles</th>
                        <th>Teléfono</th>
                        <th>Fecha Creación</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                </Table>
                <div className='paginationContainer'>
                  <Pagination className='pagination'>
                    <Pagination.First className='paginationFlechasIzquierda'/>
                    <Pagination.Prev className='paginationFlechasIzquierda'/>
                    <Pagination.Item className='paginationItem' active>{1}</Pagination.Item>
                    <Pagination.Next className='paginationFlechasDerecha'/>
                    <Pagination.Last className='paginationFlechasDerecha'/>
                  </Pagination>
                </div>     
          </div>   
        </section>
        <Footer/>
      </section>

    </section>
  );
}

export default Seguridad;
