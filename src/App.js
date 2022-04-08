import React, { useState } from "react";
import "./App.css";
import { PageContainer } from "./components/layout/pageContainer";
import { TailwindSideBar } from "./components/NewSideBar";
import user from "./images/fotoEjemplo.jpg";

function App() {
  return (
    <PageContainer>
      <div>Usuario ajustes</div>
      <table></table>
    </PageContainer>

    // <section className="globalContainerContent">
    //   <section className="fondoGeneral">
    //     {render}
    //     <section
    //       className={
    //         hideSidebarDesk === true ? "containerHome" : "contentHideSidebar"
    //       }
    //     >
    //       {showSideBar1 === true ? (
    //         <div className="backgroundBlackSideBar"></div>
    //       ) : (
    //         ""
    //       )}
    //       <div className="divEspacioHome">
    //         <p>...</p>
    //       </div>
    //       <div className="infoPrincipal">
    //         <div className="infoPrincipalContainer">
    //           <h1>Empty Page</h1>
    //           <p>
    //             Use this page to start from scratch and place your custom
    //             content.
    //           </p>
    //           <button>Home</button>
    //         </div>
    //       </div>
    //       <Footer />
    //     </section>
    //   </section>
    // </section>
  );
}

export default App;
