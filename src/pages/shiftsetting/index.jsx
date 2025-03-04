

import { successalert, erroralert } from '../../lib/alert'


import { FaDashcube } from "react-icons/fa6";

import { IoMdSettings } from "react-icons/io";


import React, { useEffect, useState } from "react";



import axios from "axios";

import Header from '../Header';
import Link from 'next/link';
import Boilerplate from '../boilerplate';
import Authentication from '../components/authentication';


const ShiftSetting = ({ isLoggedIn, setIsLoggedIn }) => {


    const [shiftname, setShiftname] = useState("");
    const [shiftdata, setShiftdata] = useState([]);

    const [loading, setLoading] = useState(false);





    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://apitextilediwanji.work.gd/addshift', { shiftname }, { withCredentials: true })
            .then(res => {
                if (res.data.message === "shift added") {
                    // toast.success("Shift added", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Shift added")
                    // After successful addition, fetch updated data
                    fetchShiftData();
                }
            })
            .catch(err => {
                // //console.log(err);
            });
    };

    const fetchShiftData = () => {
        setLoading(true)
        axios.get('https://apitextilediwanji.work.gd/getshiftdata', { withCredentials: true })
            .then(res => {
                // //console.log(res.data);
                setShiftdata(res.data);
                setLoading(false)
            })
            .catch(err => {
                // //console.log(err);
            });
    };

    useEffect(() => {
        fetchShiftData();
    }, []);


    const handleDelete = (srno) => {
        axios.delete('https://apitextilediwanji.work.gd/shiftdelete', { data: { srno }, withCredentials: true })
            .then(res => {
                if (res.data.message === "shift deleted") {
                    // toast.success("Shift deleted", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Shift deleted")
                    // After successful deletion, fetch updated data
                    fetchShiftData();
                }
            })
            .catch(err => {
                // //console.log(err);
            });
    };


    // if (!isLoggedIn) {
    //     return <Navigate to="/login" replace />;
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
                    <li className="breadcrumb-item"><Link href='/dashboard'> <FaDashcube className='me-2' />setting</Link></li>

                    <li className="breadcrumb-item active" aria-current="page"><IoMdSettings className='me-2' />shift setting</li>
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
                        <h4 className="text-start ms-4 mt-2">SHIFT SETTING</h4>
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
    <div className='col-12 col-md-12'>
        <div className='card m-3 border border-0'>
            <div className='card-body'>
                <div className="row mt-3">
                    <div className="col-12 col-md-6 mt-4">
                        <form onSubmit={handleSubmit}>
                            <div className="col-9 ms-4 me-4">
                                <label className="float-start mb-3">Shift Name</label>
                                <input className="form-control" type="text" onChange={e => setShiftname(e.target.value)} />
                                <button className="btn btn-primary mt-3">SUBMIT</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-12 col-md-6 border-start" style={{ height: "350px" }}>
                        <div className="row ms-4 me-4 mt-5 scroll">
                            {
                                loading ?
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div> :
                                    <table className="table table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <th>Sr no</th>
                                                <th>Shift Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {shiftdata && shiftdata.map((o, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{o.sname}</td>
                                                    <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(o.srno)}>DELETE</button></td>
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




</div>


                        </div>
                    </Boilerplate>




        </>
    );
}



export default ShiftSetting;