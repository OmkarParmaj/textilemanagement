
import React, { useEffect, useState } from 'react'

import axios from 'axios';

import { IoMdSettings } from "react-icons/io";
import { inputdateformat } from 'reactjs-dateformat';


import { FaDashcube } from "react-icons/fa6";
import Header from '../Header';
import Link from 'next/link';
import Boilerplate from '../boilerplate';
import Authentication from '../components/authentication';





const Beamdrawinpending = ({ isLoggedIn, setIsLoggedIn }) => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false)







    useEffect(() => {
        setLoading(true)
        axios.get("http://api.textilediwanji.com/beamdrawinpending", { withCredentials: true })
            .then(res => {

                setRecords(res.data);
                setLoading(false);


            })
            .catch(err => {
                //console.log(err)
            })
    }, [])


    
  const auth = Authentication;
 

  if (!auth) {
    return null;
}


    // if (isLoggedIn === false) {
    //     return <Navigate to="/login" replace></Navigate>
    // }
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
                                                <h4 className="text-start ms-4 mt-2">BEAM DRAWIN PENDING REPORT</h4>
                                            </div>
                                            <div className="col-md-6">

                                                <Link href='/beaminwardreport' className="packingslipbutton text-decoration-none float-end">
                                                    Report
                                                </Link >

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

                                        <div className='row me-4 ms-4 mb-5 scroll'>
                                            {
                                                loading ?
                                                    <div className="d-flex justify-content-center">
                                                        <div className="spinner-border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div> :
                                                    <table className='table table-hover mt-4  text-center'   >
                                                        <thead className='border border-1 '>
                                                            <tr>
                                                                <th>UID</th>
                                                                <th>DATE</th>
                                                                <th>SETNO</th>
                                                                <th>DESIGN NO</th>
                                                                <th>WARP COUNT</th>
                                                                <th>ERFT COUNT</th>
                                                                <th>REED</th>
                                                                <th>PICK</th>
                                                                <th>DRAWIN STATUS</th>


                                                            </tr>
                                                        </thead>
                                                        <tbody className='border-start border-end'>
                                                            {records && records.map((report, index) => (
                                                                <tr key={index}>
                                                                    <td>{report.UID}</td>
                                                                    <td>{inputdateformat(report.Date)}</td>
                                                                    <td>{report.SetNo}</td>
                                                                    <td>{report.DesignNo}</td>
                                                                    <td>{report.WarpCount}</td>
                                                                    <td>{report.WeftCount}</td>
                                                                    <td>{report.Reed}</td>
                                                                    <td>{report.Pick}</td>
                                                                    <td>{report.drawinprice === 0 && report.club === 'nonclub' ? (
                                                                        <span className="badge rounded-pill text-bg-primary">PENDING</span>
                                                                    ) : <span className="badge rounded-pill text-bg-primary">PENDING</span>}</td>


                                                                </tr>
                                                            ))}
                                                        </tbody>

                                                    </table>

                                            }


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



export default Beamdrawinpending;