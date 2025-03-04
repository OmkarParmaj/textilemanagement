


import React, { useEffect, useState } from 'react'

import axios from 'axios';

import { IoIosPaper } from "react-icons/io";

import { Bounce, toast, ToastContainer } from 'react-toastify';
import { FaDownload } from "react-icons/fa6";

import { FaDashcube } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { CgInternal } from "react-icons/cg";

import { FcPrint } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";
import { FcFullTrash } from "react-icons/fc";
import { FcTemplate } from "react-icons/fc";
import { FcFeedback } from "react-icons/fc";






import Header from '../Header';
import Link from 'next/link';
import { erroralert, successalert } from '../../lib/alert';
import { Encrypt } from '../../lib/decreaption';
import Boilerplate from '../boilerplate';
import Authentication from '../components/authentication';














const BeamInwardReport = ({ isLoggedIn, setIsLoggedIn }) => {

    const [searchInput, setSearchInput] = useState('')

    const [currentPage, setCurrentPage] = useState(1);
    // const [designNo, setDesignNo] = useState("DesignNo");


    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);
    const [modalId, setModalId] = useState(null); // State to manage dynamic modal IDs
    const [loading, setLoading] = useState(false);
    const [beamdrawn, setBeamdrawn] = useState(0)
    const [beampending, setBeampending] = useState(0);
    const [modalId2, setModalId2] = useState(null)
    const [sendemail, setSendemail] = useState("");

    const [modalId3, setModalId3] = useState(null);
    const [modalId4, setModalId4] = useState(null)
    const [supdated, setSupdated] = useState(false);

    const [secreatekey, setSecreatekey] = useState("omkaryouwillwin");


    const [status, setStatus] = useState("")
    const [loading2, setLoading2] = useState(false);






    const encryptelement = (number) => {
        const omkar2 = Encrypt(number, secreatekey)
        return omkar2;


    }

    const handlestatus = (sta, e, srno) => {
        e.preventDefault();
        // setStatus(sta)

        const value = {
            status: sta
        }

        axios.put(`https://apitextilediwanji.work.gd/updatestatus?srnumber=${srno}`, value, { withCredentials: true })
            .then(res => {

                if (res.data.message === "updated status") {
                    // toast.success("Beam status updated", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    // Swal.fire({
                    //     position: "top-center",
                    //     icon: "success",
                    //     title: "Beam status updated",
                    //     showConfirmButton: false,
                    //     timer: 1500
                    //   });

                    successalert("Beam status updated");
                    setSupdated(true);
                }

            })
            .catch(err => {
                // console.log(err);
            })
    }


    const recordsPerPage = 5;

    useEffect(() => {
        fetchdata();
        setSupdated(false)
    }, [supdated])

    // const navigate = useNavigate();


    // const handleLogout = () => {
    //   setIsLoggedIn(false);
    //   navigate("/login");
    // };

    // If the user is not logged in, redirect to the login page
    // if (isLoggedIn === false) {
    //   return <Navigate to="/login" replace />;
    // }

    const fetchdata = () => {
        setLoading2(true)
        axios.get('https://apitextilediwanji.work.gd/beaminwardreport', {
            withCredentials: true
        })
            .then((res) => {
                setData(res.data);
                setRecords(res.data);

                setLoading2(false);


                // console.log(res.data);

                const mydata = res.data

                let nullCount = 0;
                let numberCount = 0;

                mydata.forEach(info => {
                    if (info.drawinprice > 1) {
                        nullCount++; // Increment null count if drawinprice is null
                    } else if (info.drawinprice < 1 && info.club === "nonclub") {
                        numberCount++; // Increment number count if drawinprice is a valid number
                    }
                });

                setBeamdrawn(nullCount)
                setBeampending(numberCount)





            })
            .catch((err) => {
                // console.log("error to fetch the data", err);
            })
    }

    const handledelete = (DesignNo) => {
        axios.delete(`https://apitextilediwanji.work.gd/delete/${DesignNo}`, { withCredentials: true })
            .then((res) => {
                fetchdata();
                setModalId(null); // Reset modal ID after deletion
                successalert("Beaminward entry deleted");
            })
            .catch((err) => {
                // console.log("err in the delete", err);
            })
    }

    const Filter = (e) => {
        const inputValue = e.target.value.toLowerCase();
        setSearchInput(inputValue);
        setCurrentPage(1); // Reset current page to 1 when filtering


    }

    // const Filter = (e) => {
    //     const inputValue = e.target.value.toLowerCase();
    //     setRecords(data.filter(s => s.DesignNo && s.DesignNo.toString().toLowerCase().includes(inputValue)));
    // }




    const sendReconsile = (Designno, setno, remail) => {
        setLoading(true);

        const sendmail = sendemail
        const heyurl = `http://www.textilediwanji.com/reco?setno=${encryptelement(setno)}&designno=${encryptelement(Designno)}&recoemail=${encryptelement(remail)}`;

        axios.post("https://apitextilediwanji.work.gd/mailreconsile", { heyurl, sendmail }, { withCredentials: true })
            .then(() => {

                // toast.success("Reconsilation slip sent", { position: "top-center", autoClose: 2000, closeOnClick: true });
                successalert("Reconsilation slip sent")
                // setEmail("");
            })
            .catch(error => {
                // toast.error("Reconsilation slip not sent! Please check Internet connection?", { position: "top-center", autoClose: 2000, closeOnClick: true });
                erroralert("Reconsilation slip not sent! Please check internet connection?");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const sendReconsile2 = (setno, Designno, remail) => {
        setLoading(true);
        const sendmail = sendemail
        const heyurl = `http://www.textilediwanji.com/setnumreco?setno=${encryptelement(setno)}&designno=${encryptelement(Designno)}&recoemail=${encryptelement(remail)}`;

        axios.post("https://apitextilediwanji.work.gd/mailreconsile", { heyurl, sendmail }, { withCredentials: true })
            .then(() => {

                // toast.success("Reconsilation slip sent", { position: "top-center", autoClose: 2000, closeOnClick: true });
                successalert("Reconsilation slip sent");
                // setEmail("");
            })
            .catch(error => {
                // toast.error("Reconsilation slip not sent! Please check Internet connection?", { position: "top-center", autoClose: 2000, closeOnClick: true });
                erroralert("Reconsilation slip not sent! Please check internet connection");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

















    useEffect(() => {
        const filteredData = searchInput
            ? data.filter(s => s.DesignNo && s.DesignNo.toString().toLowerCase().includes(searchInput))
            : data;

        const firstIndex = (currentPage - 1) * recordsPerPage;
        const lastIndex = firstIndex + recordsPerPage;
        setRecords(filteredData.slice(firstIndex, lastIndex));
    }, [data, currentPage, searchInput]);





    const nextPage = () => {
        if (currentPage < Math.ceil(data.length / recordsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const changeCPage = (n) => {
        setCurrentPage(n);
    };

    const prePage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const firstPage = () => {
        setCurrentPage(1);
    };

    const lastPage = () => {
        setCurrentPage(Math.ceil(data.length / recordsPerPage));
    };



    const npage = Math.ceil(data.length / recordsPerPage);
    // Calculate pagination numbers to display based on current page
    const paginationStart = currentPage > 3 ? currentPage - 2 : 1;
    const paginationEnd = paginationStart + 4 > npage ? npage : paginationStart + 4;
    const numbers = Array.from({ length: paginationEnd - paginationStart + 1 }, (_, index) => paginationStart + index);

    const removeprefix = (value) => {
        const filename = value ? value.replace(/^jacquardfiles\\/, '') : '';
        return filename;
    }

    // if (isLoggedIn === false) {
    //     return <Navigate to='/login' replace></Navigate>
    // }


    
  const auth = Authentication();
 

  if (!auth) {
    return null;
}

    return (
        <>



            <Boilerplate>
                <div>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        transition={Bounce}


                    ></ToastContainer>
                    <div className={`modal ${loading ? 'show' : ''}`} style={{ display: loading ? 'block' : 'none' }} tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered" >
                            <div className="modal-content" style={{ background: 'rgba(255, 255, 255, 0.7)' }}>
                                <div className="modal-body" style={{ background: 'rgba(255, 255, 255, 0.7)' }}>
                                    <h4 className="text-center">Sending Reconsilation report</h4>
                                    <div className="text-center mt-4">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* header section strts here  */}
                    <Header setIsLoggedIn={setIsLoggedIn}></Header>

                    {/* header section ends here  */}


                    <div className='row pathing mt-4 mb-4'>
                        <div className='col-12 col-sm-12 d-flex justify-content-start '>
                            <span className="ms-4 mt-2">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link href='/dashboard'> <FaDashcube className='me-2' />Home</Link></li>
                                        <li className="breadcrumbrun-item"> <TbReportAnalytics className='me-2' />Reports</li>

                                        <li className="breadcrumb-item active" aria-current="page"><CgInternal className='me-2' />Beaminward report</li>
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
                                        <div className="col-md-5">
                                            <h4 className="text-start ms-4 mt-2">BEAM INWARD REPORT </h4>
                                        </div>
                                        <div className="col-md-7 d-flex justify-content-end">

                                            <Link style={{ fontSize: "13px" }} href="/datewisebeaminwardreport" className="packingslipbutton float-end">
                                                Datewise beaminward Report
                                            </Link>
                                            <Link style={{ fontSize: "13px" }} href="/fabricpendingreport" className="packingslipbutton float-end">
                                                Fabric pending report
                                            </Link>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3 mb-3">
                        {/* <div className="col-md-9 ">
                    <div className="card ">
                        <div className="car-body loomcard">
                            <img src="/loom.jpg" className="myimage"></img>

                        </div>
                    </div>

                </div> */}
                    </div>

                    <div className="row  cards  mt-4 mb-4 p-3">
                        <div className="col-sm-3 col-12 column1">
                            <div className="card dashboarduppercard shadow">
                                <div className="title  d-flex justify-content-end">

                                    <div className='col-8 '>
                                        <p className="title-text  ">
                                            Total Beam Drawn
                                        </p>
                                    </div>
                                    <div className='col-4 '>
                                        <p className="percent  ">

                                        </p>
                                    </div>



                                </div>
                                <div className="data text-center">
                                    <p className="text-center">
                                        {beamdrawn} <span className="t1 text-center"></span>
                                    </p>


                                    <div className="range">
                                        <div className="fill">
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-sm-3 col-12 column2">

                            <div className="card dashboarduppercard shadow">
                                <div className="title  d-flex justify-content-end">

                                    <div className='col-12 '>
                                        <p className="title-text  ">
                                            Drawin Beam pending
                                        </p>
                                    </div>
                                    {/* <div className='col-4 '>
                                        <p className="percent  ">

                                        </p>
                                    </div> */}



                                </div>

                                <Link href="/beamdrawinpending" className="text-decoration-none">
                                    <div className="data text-center">


                                        <p className="text-center" >
                                            {beampending} <span className="t1 text-center"></span>

                                        </p>












                                        <div className="range">
                                            <div className="fill">
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                        </div>

                    </div>



                    <div className='row '>
                        <div className='col-12 col-md-12 '>
                            <div className='card m-3 border border-0 ' >
                                <div className='card-body'>

                                    <div className='row ms-4 me-4 mt-4 mb-4 d-flex justify-content-end'>
                                        <div className="col-12 col-md-3">
                                            <h6 className='text-start'>Search result using Design no</h6>
                                            <input type='text' className="form-control" onChange={Filter} placeholder="search on Design no"></input>

                                        </div>


                                    </div>
                                    <div className='row   mb-5 scroll  overflow-auto' >
                                        {
                                            loading2 ?
                                                <div className="d-flex justify-content-center">
                                                    <div className="spinner-border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </div> :
                                                <table className='table table-hover mt-4  text-center'   >
                                                    <thead className='border border-1 '>
                                                        <tr>
                                                            <th style={{fontSize: "13px"}}>UID</th>
                                                            <th style={{fontSize: "13px"}}>DATE</th>
                                                            <th style={{fontSize: "13px"}}>SETNO</th>
                                                            <th style={{fontSize: "13px"}}>DESIGN NO</th>
                                                            {/* <th style={{fontSize: "13px"}}>WARP COUNT</th>
<th style={{fontSize: "13px"}}>ERFT COUNT</th>
<th style={{fontSize: "13px"}}>REED</th>
<th style={{fontSize: "13px"}}>PICK</th> */}
                                                            <th style={{fontSize: "13px"}}>DRAWIN STATUS</th>
                                                            <th style={{fontSize: "13px"}}>BEAM STATUS</th>
                                                            <th style={{fontSize: "13px"}}>PRINT</th>
                                                            <th style={{fontSize: "13px"}}>EDIT</th>
                                                            <th style={{fontSize: "13px"}}>DELETE</th>
                                                            <th style={{fontSize: "13px"}}>RECO</th>
                                                            <th style={{fontSize: "13px"}}>SETNUM RECO</th>
                                                            <th style={{fontSize: "13px"}}>SEND MAIL</th>
                                                            <th style={{fontSize: "13px"}}>SEND MAIL(setnum)</th>
                                                            <th style={{fontSize: "13px"}}>STATUS</th>
                                                            <th style={{fontSize: "13px"}}>DESIGN PAPER</th>
                                                            <th style={{fontSize: "13px"}}>JAQ FILE</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className='border-start border-end'>
                                                        {records && records.map((report, index) => (
                                                            <tr key={index}>
                                                                <td style={{fontSize: "13px"}}>{report.UID}</td>
                                                                <td style={{fontSize: "13px"}}>{formatDate(report.Date)}</td>
                                                                <td style={{fontSize: "13px"}}>{report.SetNo}</td>
                                                                <td style={{fontSize: "13px"}}>{report.DesignNo}</td>
                                                                {/* <td style={{fontSize: "13px"}}>{report.WarpCount}</td>
 <td style={{fontSize: "13px"}}>{report.WeftCount}</td>
 <td style={{fontSize: "13px"}}>{report.Reed}</td>
 <td style={{fontSize: "13px"}}>{report.Pick}</td> */}
                                                                <td style={{fontSize: "13px"}}>
                                                                    {report.drawinprice ? (
                                                                        <span className="badge rounded-pill text-bg-primary" style={{ width: "120px" }}>DRAWN</span>
                                                                    ) : (
                                                                        report.club === 'club' ? (
                                                                            <span className="badge rounded-pill text-bg-secondary">NO NEED DRAWIN</span>
                                                                        ) : (
                                                                            <span className="badge rounded-pill text-bg-danger" style={{ width: "120px" }}>PENDING</span>
                                                                        )
                                                                    )}
                                                                </td>
                                                                <td style={{fontSize: "13px"}}>
                                                                    <span
                                                                        className={`${report.beamstatus === "drawin completed" ? "text-bg-dark badge rounded-pill" :
                                                                            report.beamstatus === "under drawin" ? "text-bg-secondary badge rounded-pill" :
                                                                                report.beamstatus === "on loom" ? "text-bg-warning badge rounded-pill" :
                                                                                    report.beamstatus === "on floor" ? "text-bg-danger badge rounded-pill" :
                                                                                        report.beamstatus === "Ready to dispatch" ? "text-bg-primary badge rounded-pill" :
                                                                                            report.beamstatus === "Fabric dispatched" ? "text-bg-success badge rounded-pill" :
                                                                                                report.beamstatus === "under mending" ? "text-bg-info badge rounded-pill" :
                                                                                                    report.beamstatus === "Fabric dispatched" ? "text-bg-info badge rounded-pill" :
                                                                                                        "" // default case if none of the conditions match
                                                                            }`}
                                                                        style={{ width: "120px" }}
                                                                    >
                                                                        {report.beamstatus}
                                                                    </span>

                                                                </td>

                                                                <td style={{fontSize: "13px"}}><Link href={`/beaminwardprint2/${report.DesignNo}/${report.srno}`} className="printone" ><FcPrint className="printone" /></Link></td>
                                                                <td style={{fontSize: "13px"}}><Link href={`/beaminwardedit/${report.srno}`} ><FcEditImage className="printone" /></Link></td>
                                                                <td style={{fontSize: "13px"}}>
                                                                    <button
                                                                        className='border-0'
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target={`#exampleModal-${report.DesignNo}`} // Dynamic modal ID
                                                                        onClick={() => setModalId(report.DesignNo)} // Set modal ID on click
                                                                    >
                                                                        <FcFullTrash className="printone" />
                                                                    </button>
                                                                    <div
                                                                        className="modal fade"
                                                                        id={`exampleModal-${report.DesignNo}`} // Dynamic modal ID
                                                                        tabIndex="-1"
                                                                        aria-labelledby={`exampleModalLabel-${report.DesignNo}`} // Dynamic modal label ID
                                                                        aria-hidden="true"
                                                                    >
                                                                        <div className="modal-dialog modal-dialog-centered">
                                                                            <div className="modal-content">
                                                                                <div className="modal-header">
                                                                                    <h5 className="modal-title" id={`exampleModalLabel-${report.DesignNo}`}>ALERT</h5>
                                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                </div>
                                                                                <div className="modal-body">
                                                                                    <p>Are you sure! You want to DELETE this?</p>
                                                                                </div>
                                                                                <div className="modal-footer">
                                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                    <button
                                                                                        className="btn btn-primary"
                                                                                        onClick={() => handledelete(report.srno)}
                                                                                        data-bs-dismiss="modal"
                                                                                    >
                                                                                        DELETE
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td style={{fontSize: "13px"}}><Link href={`/reconsilation/${report.SetNo}/${report.DesignNo}`}  ><FcTemplate className="printone" /></Link></td>
                                                                <td style={{fontSize: "13px"}}><Link href={`/setnumberwisereco/${report.SetNo}/${report.DesignNo}`}  ><FcTemplate className="printone" /></Link></td>
                                                                <td style={{fontSize: "13px"}}>
                                                                    {/* <button className="border border-0" onClick={() => sendReconsile(report.DesignNo, report.SetNo, report.Email)}><FcFeedback className="printone border border-0" /></button> */}

                                                                    <button
                                                                        className="border-0"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target={`#exampleModal2-${report.srno}`}
                                                                        onClick={() => setModalId2(report.srno)}

                                                                    >
                                                                        <FcFeedback className="printone border border-0" />

                                                                    </button>

                                                                    <div
                                                                        className="modal fade"
                                                                        id={`exampleModal2-${report.srno}`} // Dynamic modal ID
                                                                        tabIndex="-1"
                                                                        aria-labelledby={`exampleModalLabel2-${report.srno}`} // Dynamic modal label ID
                                                                        aria-hidden="true"
                                                                    >
                                                                        <div className="modal-dialog modal-dialog-centered">
                                                                            <div className="modal-content">
                                                                                <div className="modal-header">
                                                                                    <h5 className="modal-title text-center" id={`exampleModalLabel2-${report.srno}`}>Please enter Emailid to sent packingslip</h5>
                                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                </div>
                                                                                <div className="modal-body">
                                                                                    <label className='form-label float-start'>Email Id</label>
                                                                                    <input className='form-control' type='text' onChange={e => setSendemail(e.target.value)} ></input>
                                                                                </div>
                                                                                <div className="modal-footer">
                                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                    <button
                                                                                        className="btn btn-primary"
                                                                                        onClick={() => sendReconsile(report.DesignNo, report.SetNo, report.Email)}
                                                                                        data-bs-dismiss="modal"
                                                                                    >
                                                                                        SEND
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>



                                                                </td>
                                                                <td style={{fontSize: "13px"}}>
                                                                    {/* <button className="border border-0" onClick={() => sendReconsile2(report.DesignNo, report.SetNo, report.Email)}><FcFeedback className="printone border border-0" /></button> */}

                                                                    <button
                                                                        className="border-0"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target={`#exampleModal3-${report.srno}`}
                                                                        onClick={() => setModalId2(report.srno)}

                                                                    >
                                                                        <FcFeedback className="printone border border-0" />

                                                                    </button>

                                                                    <div
                                                                        className="modal fade"
                                                                        id={`exampleModal3-${report.srno}`} // Dynamic modal ID
                                                                        tabIndex="-1"
                                                                        aria-labelledby={`exampleModalLabel3-${report.srno}`} // Dynamic modal label ID
                                                                        aria-hidden="true"
                                                                    >
                                                                        <div className="modal-dialog modal-dialog-centered">
                                                                            <div className="modal-content">
                                                                                <div className="modal-header">
                                                                                    <h5 className="modal-title text-center" id={`exampleModalLabel3-${report.srno}`}>Please enter Emailid to sent packingslip</h5>
                                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                </div>
                                                                                <div className="modal-body">
                                                                                    <label className='form-label float-start'>Email Id</label>
                                                                                    <input className='form-control' type='email' onChange={e => setSendemail(e.target.value)} ></input>
                                                                                </div>
                                                                                <div className="modal-footer">
                                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                    <button
                                                                                        className="btn btn-primary"
                                                                                        onClick={() => sendReconsile2(report.SetNo, report.DesignNo, report.Email)}
                                                                                        data-bs-dismiss="modal"
                                                                                    >
                                                                                        SEND
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>




                                                                </td>
                                                                <td style={{fontSize: "13px"}}>

                                                                    <button
                                                                        className='border-0 btn btn-primary btn-sm'
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target={`#exampleModal4-${report.srno}`} // Dynamic modal ID
                                                                        onClick={() => setModalId4(report.srno)} // Set modal ID on click
                                                                    >
                                                                        STATUS
                                                                    </button>
                                                                    <div
                                                                        className="modal fade"
                                                                        id={`exampleModal4-${report.srno}`} // Dynamic modal ID
                                                                        tabIndex="-1"
                                                                        aria-labelledby={`exampleModalLabel4-${report.srno}`} // Dynamic modal label ID
                                                                        aria-hidden="true"
                                                                    >
                                                                        <div className="modal-dialog modal-dialog-centered">
                                                                            <div className="modal-content">
                                                                                <div className="modal-header">
                                                                                    <h5 className="modal-title" id={`exampleModalLabel4-${report.srno}`}>Update beam status</h5>
                                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                </div>
                                                                                <div className="modal-body d-block justify-content-around align-items-center">
                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-6">
                                                                                            <button className="btn btn-primary btn-sm" onClick={e => handlestatus("on floor", e, report.srno)} data-bs-dismiss="modal">ON FLOOR</button>

                                                                                        </div>
                                                                                        <div className="col-12 col-md-6">
                                                                                            <button className="btn btn-primary btn-sm" onClick={e => handlestatus("under drawin", e, report.srno)} data-bs-dismiss="modal">UNDER DRAWIN</button>

                                                                                        </div>

                                                                                    </div>
                                                                                    <div className="row mt-3">
                                                                                        <div className="col-12 col-md-6">
                                                                                            <button className="btn btn-primary btn-sm" onClick={e => handlestatus("drawin completed", e, report.srno)} data-bs-dismiss="modal">DRAWIN-COMPLETED</button>

                                                                                        </div>
                                                                                        <div className="col-12 col-md-6">
                                                                                            <button className="btn btn-primary btn-sm" onClick={e => handlestatus("on loom", e, report.srno)} data-bs-dismiss="modal">ON LOOM</button>

                                                                                        </div>

                                                                                    </div>
                                                                                    <div className="row mt-3">
                                                                                        <div className="col-12 col-md-6">
                                                                                            <button className="btn btn-primary btn-sm" onClick={e => handlestatus("under mending", e, report.srno)} data-bs-dismiss="modal">UNDER MENDING</button>

                                                                                        </div>
                                                                                        <div className="col-12 col-md-6">
                                                                                            <button className="btn btn-primary btn-sm" onClick={e => handlestatus("Fabric dispatched", e, report.srno)} data-bs-dismiss="modal">Fabric Dispathced</button>

                                                                                        </div>

                                                                                    </div>






                                                                                </div>
                                                                                {/* <div className="modal-footer">
                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     <button
                         className="btn btn-primary"
                         onClick={() => handledelete(report.srno)}
                         data-bs-dismiss="modal"
                     >
                         DELETE
                     </button>
                 </div> */}
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                </td>
                                                                <td style={{fontSize: "13px"}}>{report.designfile ? <Link target='_blank' href={`http://www.textilediwanji.com/designpaperprint?designpaper=${report.designfile}`}><IoIosPaper className="printone" /></Link> : <span className="badge rounded-pill text-bg-secondary">NO FILE</span>}</td>
                                                                <td style={{fontSize: "13px"}}>
                                                                    {report.jacquardfile ? (
                                                                        <a href={`https://apitextilediwanji.work.gd/jacquardfiles/${removeprefix(report.jacquardfile)}`} download>
                                                                            <FaDownload className="printone" />
                                                                        </a>
                                                                    ) : (
                                                                        <span className="badge rounded-pill text-bg-secondary">NO FILE</span>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>

                                                </table>

                                        }


                                        <nav className=" d-flex justify-content-end">
                                            <ul className='pagination'>
                                                <li className='page-item'>
                                                    <button className='page-link' onClick={firstPage}>First</button>
                                                </li>
                                                <li className='page-item'>
                                                    <button className='page-link' onClick={prePage}>Prev</button>
                                                </li>
                                                {numbers.map((n) => (
                                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={n}>
                                                        <button className='page-link' onClick={() => changeCPage(n)}>{n}</button>
                                                    </li>
                                                ))}
                                                <li className='page-item'>
                                                    <button className='page-link' onClick={nextPage}>Next</button>
                                                </li>
                                                <li className='page-item'>
                                                    <button className='page-link' onClick={lastPage}>Last</button>
                                                </li>
                                            </ul>
                                        </nav>
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



export default BeamInwardReport;