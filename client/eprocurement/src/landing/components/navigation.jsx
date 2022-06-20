import { Dialog } from "primereact/dialog";
import { useState } from "react";
import FormikFormDemo  from "../../components/supplier/Dashboard/RegisterOfficer";


export const Navigation = (props) => {
  const [vis,setVis]=useState(false)
  return (
    <>
    
   
    <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          <a className='navbar-brand page-scroll' href='#page-top'>
            ETHENDER
          </a>{' '}
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <a href='#features' className='page-scroll'>
                Features
              </a>
            </li>
            <li>
              <a href='#about' className='page-scroll'>
                About
              </a>
            </li>
            <li>
              <a href='#services' className='page-scroll'>
                Services
              </a>
            </li>
            <li>
              <a href='#portfolio' className='page-scroll' onClick={(()=>{
                setVis(true)
              })}>
                REGISTER AS SUPPLIER
              </a>
            </li>
            <li>
              <a href='/login' className='page-scroll'>
                LOGIN
              </a>
            </li>
            
          </ul>
        </div>
      </div>
    </nav> 
    
    <Dialog
          visible={vis}
          dismissableMask
          className="p-fluid"
          style={{ width: "80rem" }}
          header="REGISTER SUPPLIER"
          onHide={() => {
            setVis(false);
          }}
        >
          <FormikFormDemo />
        </Dialog>
    </>
  )
}
