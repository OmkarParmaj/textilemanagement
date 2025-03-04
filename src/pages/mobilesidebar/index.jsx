import React from 'react'
// import { Link } from 'react-router-dom'


import { FaAngleDown } from "react-icons/fa";

import { FaDashcube } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";

// import '../Assets/mobilesidebar.css';


import { CgInternal } from "react-icons/cg";
import { VscServerProcess } from "react-icons/vsc";
import { IoNewspaperOutline } from "react-icons/io5";
// import { PiYarnFill } from "react-icons/pi";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import Link from 'next/link';
import Authentication from '../components/authentication';


const Mobilesidebar = () => {



    // const handleLogout = () => {
    //     setIsLoggedIn(false);
    //     navigate("/login");
    // };

    const auth = Authentication();
 

    if (!auth) {
      return null;
  }


    return (
        <>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header d-flex justify-content-center align-items-center">
                    <img className="mobilelogo border border-1" src="/logo.png" alt="logo"></img>
                    <button type="button" className="btn-close border border-1" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                 
                    <Link className="btn btn-primary dashboardbutton mt-2" href="/dashboard" >
                        <FaDashcube className='me-2' /> Dashboard
                    </Link>
                    <Link className="btn btn-primary dashboardbutton mt-2" href="/mis">
                        <CgInternal className='me-2' /> MIS
                    </Link>
                    <Link className="btn btn-primary dashboardbutton mt-2" href="/beaminward">
                        <CgInternal className='me-2' /> Beam Inward
                    </Link>
                    <Link className="btn btn-primary dashboardbutton mt-2" href="/production" >
                        <VscServerProcess className='me-2' /> Production
                    </Link>
                    <Link className="btn btn-primary dashboardbutton mt-2" href="/packingslip" >
                        <IoNewspaperOutline className='me-2' /> Packing slip
                    </Link>
                    <Link className="btn btn-primary dashboardbutton mt-2" href="/yarninward" >
                        <CgInternal className='me-2' /> Yarn Inward
                    </Link>
                    {/* <Link className="btn btn-primary dashboardbutton mt-2" href="/billing" >
                        <FaFileInvoiceDollar className='me-2' /> Billing
                    </Link> */}
                    <Link className="btn btn-primary dashboardbutton mt-2" href="/loomstatus" >
                        <FaFileInvoiceDollar className='me-2' /> Loom status
                    </Link>
                    <Link className="btn btn-primary dashboardbutton mt-2" href="/drawin" >
                        <FaFileInvoiceDollar className='me-2' /> Drawin
                    </Link>
                    <button className="btn btn-primary dashboardbutton mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <TbReport className='me-2' /> Reports <FaAngleDown style={{ marginLeft: "200px" }} />
                    </button>
                    <div className="collapse" id="collapseExample">
                        <div className="border border-0 collapsecard m-0 p-0">
                            <Link className="btn btn-primary button1 ms-3  mt-1 " href="/beaminwardreport" >
                                Beam inward 
                            </Link>
                            <Link className="btn btn-primary button2  ms-3 mt-2 " href='/productionreport' >
                                Production 
                            </Link>
                            <Link className="btn btn-primary button2  ms-3 mt-2 " href='/monthlyproduction' >
                                Monthly Production
                            </Link>
                            <Link className="btn btn-primary button2  ms-3 mt-2 " href='/packingslipreport' >
                                Packing slip 
                            </Link>
                            <Link className="btn btn-primary button2  ms-3 mt-2 " href="/yarninwardreport" >
                                Yarn inward 
                            </Link>
                            {/* <Link className="btn btn-primary button2  ms-3 mt-2 " href='/billingreport' >
                                Billing Inward 
                            </Link>
                            <Link className="btn btn-primary button2  ms-3 mt-2 " href='/billpending' >
                                Bill pending 
                            </Link> */}
                        </div>
                    </div>
                    <Link className="btn btn-primary dashboardbutton mt-2" href="/setting" >
                        <IoMdSettings className='me-2' /> Setting
                    </Link>
                   
                </div>
            </div>

        </>
    )
}

export default Mobilesidebar