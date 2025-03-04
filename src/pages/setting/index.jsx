

import { IoMdSettings } from "react-icons/io";
import { FaDashcube } from "react-icons/fa6";
import { FcBusinessman } from "react-icons/fc";




import React, { useEffect, useState } from "react";


import { FcFactoryBreakdown } from "react-icons/fc";
import axios from "axios";
import { FcLibrary } from "react-icons/fc";
import { FcConferenceCall } from "react-icons/fc";
import { FcLock, FcManager } from "react-icons/fc";
import { FcClock } from "react-icons/fc";

import Header from "../Header";
import Link from "next/link";
import Boilerplate from "../boilerplate";
import Authentication from "../components/authentication";









const Setting = ({ isLoggedIn, setIsLoggedIn }) => {

    const [settingvalue, setSettingvalue] = useState({
        setting: "SETTING",
        url: "/setting"
    })



    const [totalcompany, setTotalcompany] = useState([]);
    const [totalparty, setTotalparty] = useState([]);
    const [shiftcount, setShiftcount] = useState([]);
    const [banks, setBanks] = useState(0);

    useEffect(() => {
        axios.get('https://apitextilediwanji.work.gd:5000/totalparty', { withCredentials: true })
            .then(res => {
                setTotalparty(res.data[0].totalparty)
            })
            .catch(err => {
                // console.log(err);
            })
    }, [])


    useEffect(() => {
        axios.get('https://apitextilediwanji.work.gd:5000/totalcompany', { withCredentials: true })
            .then(res => {
                setTotalcompany(res.data[0].totalcompany);
            })
            .catch(err => {
                // console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get('https://apitextilediwanji.work.gd:5000/totalbanks', { withCredentials: true })
            .then(res => {

                const totalbanks = res.data[0].totalbanks;

                setBanks(totalbanks);


            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    useEffect(() => {
        axios.get('https://apitextilediwanji.work.gd:5000/shiftnumber', { withCredentials: true })
            .then(res => {
                setShiftcount(res.data[0].totalshift)
            })
            .catch(err => {
                // console.log(err);
            })
    }, [])



    // if (isLoggedIn === false) {
    //     return <Navigate to="/login" replace />
    // }


    const auth = Authentication();
 

    if (!auth) {
      return null;
  }


    return (
        <>


            <Boilerplate>
                <div>

                    {/* header section strts here  */}
                    <Header setIsLoggedIn={setIsLoggedIn}></Header>

                    {/* header section ends here  */}


                    <div className='row pathing mt-4 mb-4'>
                        <div className='col-12 col-sm-12 d-flex justify-content-start '>
                            <span className="ms-4 mt-2">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link href='/dashboard'> <FaDashcube className='me-2' />Home</Link></li>

                                        <li className="breadcrumb-item active" aria-current="page"><IoMdSettings className='me-2' />Setting</li>
                                    </ol>
                                </nav>


                            </span>
                        </div>

                    </div>

                    <div className="row packingsliplabel">
                        <div className="col-md-12 ">
                            <div className="card  shadow-sm m-3 border border-0">
                                <div className="car-body">
                                    <div className="row mt-2 mb-2">
                                        <div className="col-md-6">
                                            <h4 className="text-start ms-4 mt-2">SETTING</h4>
                                        </div>
                                        <div className="col-md-6">

                                            {/* <Link href='/setting' className="packingslipbutton text-decoration-none float-end">
                                                    Report
                                                </Link > */}

                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>





                    <div className='row '>
                        <div className='col-12 col-md-12 '>
                            <div className='card m-3 border border-0 '>
                                <div className='card-body'>

                                    <div className="row d-flex justify-content-center mt-4 mainrowmobile">
                                        <div className="col-12 col-md-11 ">
                                            <div className="row">

                                                {/* <h5 className="text-start ">Settings</h5> */}
                                                {/* <hr></hr> */}


                                            </div>
                                            <div className="row mt-3 ms-2 mb-3"><p className="text-start">Company settings</p></div>
                                            <div className="row mb-5 ms-4 me-4">
                                                <div className="col-12 col-md-3">
                                                    <Link href='/companyregistration' style={{ cursor: "pointer" }} className="text-decoration-none">
                                                        <div className="card">
                                                            <div className="card-body ">
                                                                <div className="card-title">
                                                                    <h5 className="text-center" style={{fontSize: "16px"}}>COMPANY REGISTRATION</h5>
                                                                </div>
                                                                <div className="row mt-2">
                                                                    <div className="col-6 col-md-6 d-flex justify-content-center align-items-center">
                                                                        <FcFactoryBreakdown className="mt-2 " style={{ height: "70px", width: "70px" }} />
                                                                    </div>
                                                                    <div className="col-6 col-md-6 m-0 border-start border-2">
                                                                        <h6 className="mt-3 text-center" style={{ fontSize: "14px" }}>Total company</h6>
                                                                        <h4 className="text-center">{totalcompany}</h4>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="col-12 col-md-3 banksettingmobile">
                                                    <Link href='/companybankdetails' style={{ cursor: "pointer" }} className="text-decoration-none">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className="card-title">
                                                                    <h5 className=" text-center" style={{fontSize: "16px"}}>BANK REGISTRATION</h5>
                                                                </div>
                                                                <div className="row " style={{ marginTop: "32px" }}>
                                                                    <div className="col-6 col-md-6 d-flex justify-content-center align-items-center">
                                                                        <FcLibrary className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                                    </div>
                                                                    <div className="col-6 col-md-6 m-0 border-start border-2">
                                                                        <h6 className="mt-3 text-center" style={{ fontSize: "14px" }}>Total Acc</h6>
                                                                        <h4 className=" text-center">{banks}</h4>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="col-12 col-md-3 partysettingmobile">
                                                    <Link href='/party' style={{ cursor: "pointer" }} className="text-decoration-none">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className="card-title">
                                                                    <h5 className=" text-center" style={{fontSize: "16px"}}>PARTY REGISTRATION</h5>
                                                                </div>
                                                                <div className="row " style={{ marginTop: "32px" }}>
                                                                    <div className="col-6 col-md-6 d-flex justify-content-center align-items-center">
                                                                        <FcConferenceCall className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                                    </div>
                                                                    <div className="col-6 col-md-6 m-0 border-start border-2">
                                                                        <h6 className="mt-3 text-center" style={{ fontSize: "14px" }}>Total Party</h6>
                                                                        <h4 className=" text-center">{totalparty}</h4>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="col-12 col-md-3 shiftsettingmobile">
                                                    <Link href='/shiftsetting' style={{ cursor: "pointer" }} className="text-decoration-none">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className="card-title">
                                                                    <h5 className=" text-center" style={{fontSize: "16px"}}>SHIFT SETTING</h5>
                                                                </div>
                                                                <div className="row " style={{ marginTop: "32px" }}>
                                                                    <div className="col-6 col-md-6 d-flex justify-content-center align-items-center">
                                                                        <FcClock className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                                    </div>
                                                                    <div className="col-6 col-md-6 m-0 border-start border-2">
                                                                        <h6 className="mt-3 text-center" style={{ fontSize: "14px" }}>Total Shifts</h6>
                                                                        <h4 className=" text-center">{shiftcount}</h4>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>


                                            </div>
                                            <hr></hr>
                                            <div className="row ms-2 mt-3 mb-3"><h6 className="text-start">Account Settings</h6></div>
                                            <div className="row mb-5 ms-4 me-4">
                                                <div className="col-12 col-md-3 passwordrecoverymobile">
                                                    <Link href='/passwordrecovery' style={{ cursor: "pointer" }} className="text-decoration-none">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className="card-title">
                                                                    <h5 className="text-center" style={{fontSize: "16px"}}>PASSWORD RECOVERY</h5>
                                                                </div>
                                                                <div className="row" style={{ marginTop: "10px" }}>
                                                                    <div className="col d-flex justify-content-center align-items-center">
                                                                        <FcLock className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="col-12 col-md-3 profilesettingmobile">
                                                    <Link href='/profilesetting' style={{ cursor: "pointer" }} className="text-decoration-none">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className="card-title">
                                                                    <h5 className="text-center" style={{fontSize: "16px"}}>PROFILE SETTING</h5>
                                                                </div>
                                                                <div className="row" style={{ marginTop: "10px" }}>
                                                                    <div className="col d-flex justify-content-center align-items-center">
                                                                        <FcBusinessman className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="col-12 col-md-3 profilesettingmobile">
                                                    <Link href='/employeemanagement' style={{ cursor: "pointer" }} className="text-decoration-none">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className="card-title">
                                                                    <h5 className="text-center" style={{fontSize: "16px"}}>EMPLOYEE MANG</h5>
                                                                </div>
                                                                <div className="row" style={{ marginTop: "10px" }}>
                                                                    <div className="col d-flex justify-content-center align-items-center">
                                                                        <FcManager className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                {/* <div className="col-12 col-md-3 profilesettingmobile">
                                                        <Link href='/billingsetting' style={{ cursor: "pointer" }} className="text-decoration-none">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="card-title">
                                                                        <h5 className="text-center" style={{fontSize: "16px"}}>Biling setting</h5>
                                                                    </div>
                                                                    <div className="row" style={{ marginTop: "10px" }}>
                                                                        <div className="col d-flex justify-content-center align-items-center">
                                                                            <FcManager className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div> */}
                                            </div>

                                        </div>
                                    </div>




                                </div>


                            </div>

                        </div>




                    </div>

                </div>
            </Boilerplate>






        </>
    );
}


export default Setting;