

import { FcManager } from "react-icons/fc";
import { IoMdSettings } from "react-icons/io";
import { FaDashcube } from "react-icons/fa6";
import Header from '../Header';
import Link from 'next/link';
import Boilerplate from "../boilerplate";
import Authentication from "../components/authentication";

const EmployeeManagement = ({ isLoggedIn, setIsLoggedIn }) => {




    const auth = Authentication();
 

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





                    <div className='row  ps-3 mt-4'>
                        <div className='col-12 col-md-12 '>
                            {/* <div className='card m-3 border border-0 '> */}
                            {/* <div className='card-body'> */}

                            <div className="row">

                                <div className="col-12 col-md-3 profilesettingmobile">
                                    <Link href='/addemployee' style={{ cursor: "pointer" }} className="text-decoration-none">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-title">
                                                    <h5 className="text-center">EMPLOYEE</h5>
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
                                <div className="col-12 col-md-3 profilesettingmobile">
                                    <Link href='/attendance' style={{ cursor: "pointer" }} className="text-decoration-none">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-title">
                                                    <h5 className="text-center">ATTENDANCE</h5>
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

                                <div className="col-12 col-md-3 profilesettingmobile">
                                    <Link href='/payroll' style={{ cursor: "pointer" }} className="text-decoration-none">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-title">
                                                    <h5 className="text-center">PAYROLL</h5>
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


                            </div>






                            {/* </div>


                                </div> */}

                        </div>




                    </div>


                </div>
            </Boilerplate>






        </>
    );
}



export default EmployeeManagement;