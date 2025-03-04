import React from "react";
// import { Link } from 'react-router-dom'
import { FaAngleDown } from "react-icons/fa";

import { FaDashcube } from "react-icons/fa6";
// import '../Assets/computersidebar.css';

import { CgInternal } from "react-icons/cg";
import { VscServerProcess } from "react-icons/vsc";
import { IoNewspaperOutline } from "react-icons/io5";
// import { PiYarnFill } from "react-icons/pi";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";
import Authentication from "../components/authentication";


const Computersidebar = () => {


    const auth = Authentication();
 

    if (!auth) {
      return null;
  }


    return (
        <>
            <div className="computersidebarmycss" >
                {/* sidebar header starts here  */}
                <div className="row  d-flex justify-content-center align-items-center">

                    <img className="tdlogo" src="/logo.png" alt="logo"></img>
                </div>
                {/* sidebar header ends here  */}

                {/* sidebar body starts here  */}
                <div className="row mt-5 ms-1 me-1 ">
                    <Link style={{fontSize: "15px"}} className="btn btn-success dashboardbutton mt-2 " href="/dashboard" >
                        <FaDashcube className='me-2' /> Dashboard
                    </Link>
                    <Link style={{fontSize: "15px"}} className="btn btn-success dashboardbutton mt-2" href="/mis">
                        <CgInternal className='me-2' /> MIS
                    </Link>
                    <Link style={{fontSize: "15px"}} className="btn btn-success dashboardbutton mt-2" href="/beaminward">
                        <CgInternal className='me-2' /> Beam Inward
                    </Link>
                    <Link style={{fontSize: "15px"}} className="btn btn-success dashboardbutton mt-2" href="/production" >
                        <VscServerProcess className='me-2' /> Production
                    </Link>
                    
                    <Link style={{fontSize: "15px"}} className="btn btn-success dashboardbutton mt-2" href="/packingslip" >
                        <IoNewspaperOutline className='me-2' /> Packing slip
                    </Link>
                    <Link style={{fontSize: "15px"}} className="btn btn-success dashboardbutton mt-2" href="/yarninward" >
                        <CgInternal className='me-2' /> Yarn Inward
                    </Link>
                    {/* <Link style={{fontSize: "15px"}} className="btn btn-success dashboardbutton mt-2" href="/billing" >
                        <FaFileInvoiceDollar className='me-2' /> Billing
                    </Link> */}
                    <Link style={{fontSize: "15px"}} className="btn btn-success dashboardbutton mt-2" href="/loomstatus" >
                        <FaFileInvoiceDollar className='me-2' /> Loom status
                    </Link>
                    <Link style={{fontSize: "15px"}} className="btn btn-success dashboardbutton mt-2" href="/drawin" >
                        <FaFileInvoiceDollar className='me-2' /> Draw-In
                    </Link>
                    <Link style={{fontSize: "15px"}} className="btn btn-success dashboardbutton mt-2" href='/tallygstreport'>
                      <FaFileInvoiceDollar className="me-2">
                        
                      </FaFileInvoiceDollar>
                      Tally GST Report
                    </Link>

                    <button className="btn btn-success dashboardbutton mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <TbReport className='me-2' /> Reports <FaAngleDown style={{ marginLeft: "80px" }} />
                    </button>
                    <div className="collapse" id="collapseExample">
                        <div className="border border-0  collapsecard  ">
                            <Link style={{fontSize: "15px"}} className="btn btn-success-emphasis button1 ms-3  mt-1 " href="/beaminwardreport" >
                                Beam inward
                            </Link>
                            <Link style={{fontSize: "15px"}} className="btn btn-success button2  ms-3 mt-2 " href='/productionreport' >
                                Production
                            </Link>
                            <Link style={{fontSize: "15px"}} className="btn btn-success button2  ms-3 mt-2 " href='/productionedit' >
                                Production edit
                            </Link>
                            <Link style={{fontSize: "15px"}} className="btn btn-success button2  ms-3 mt-2 " href='/monthlyproduction' >
                                Monthly Production
                            </Link>
                            <Link style={{fontSize: "15px"}} className="btn btn-success button2  ms-3 mt-2 " href='/packingslipreport' >
                                Packing slip
                            </Link>
                            <Link style={{fontSize: "15px"}} className="btn btn-success button2  ms-3 mt-2 " href="/yarninwardreport" >
                                Yarn inward
                            </Link>
                            {/* <Link style={{fontSize: "15px"}} className="btn btn-success button2  ms-3 mt-2 " href='/billingreport' >
                                Billing Inward
                            </Link>
                            <Link style={{fontSize: "15px"}} className="btn btn-success button2  ms-3 mt-2 " href='/billpending' >
                                Bill pending
                            </Link> */}
                        </div>
                    </div>
                    <Link style={{fontSize: "15px"}} className="btn btn-success dashboardbutton mt-2" href='/setting' >
                        <IoMdSettings className='me-2' /> Setting
                    </Link>


                </div>

                {/* sidebar body ends here  */}



            </div>







        </>
    );
}


export default Computersidebar;