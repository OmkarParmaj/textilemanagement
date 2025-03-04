


import React, { useEffect, useState } from "react";


import axios from "axios";

import { successalert, erroralert } from '../../lib/alert'



import { FaDashcube } from "react-icons/fa6";

import { IoMdSettings } from "react-icons/io";
import Header from "../Header";
import Link from "next/link";
import Boilerplate from "../boilerplate";
import Authentication from "../components/authentication";




const CompanyBankDetails = ({ isLoggedIn, setIsLoggedIn }) => {



    const [bankname, setBankname] = useState("");
    const [accountno, setAccountno] = useState("");
    const [branch, setBranch] = useState("");
    const [ifsccode, setIfsccode] = useState("");
    const [bankaddress, setBankaddress] = useState("");
    const [alert, setAlert] = useState("");
    const [bankdetails, setBankdetails] = useState("");
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        fetchdata();
    }, [])

    const fetchdata = async () => {

        try {
            setLoading(true)
            const res = await axios.get('http://api.textilediwanji.com/companybankdetails', { withCredentials: true })
            // console.log(res.data);
            setBankdetails(res.data);
            setLoading(false)
        } catch (err) {
            // console.log(err);
        }

    }




    const handlesubmit = (e) => {
        e.preventDefault();

        const payload = {
            bankname,
            accountno,
            branch,
            ifsccode,
            bankaddress
        }

        axios.post('http://api.textilediwanji.com/companybankdetails', payload, { withCredentials: true })
            .then(res => {
                if (res.data.message === "data submmited") {
                    // toast.success("Bank details are submmited", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Bank details are submitted")
                    fetchdata();
                }
            })
            .catch(err => {
                // console.log(err);
            })
    }



    const handleDelete = (id) => {
        axios.delete(`http://api.textilediwanji.com/bankdetaildelete/${id}`, { withCredentials: true })
            .then(res => {

                if (res.data.message === "bank details deleted") {
                    // toast.success("Bank details is deleted", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Bank details is deleted")
                    fetchdata();
                }

            })
            .catch(err => {
                // console.log(err);
            })
    }






    // if (isLoggedIn === false) {
    //     <Navigate href='/login' replace></Navigate>
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

                                            <li className="breadcrumb-item active" aria-current="page"><IoMdSettings className='me-2' />bank details</li>
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
                                                <h4 className="text-start ms-4 mt-2">BANK DETAILS</h4>
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
                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                <form onSubmit={handlesubmit}>
                                                    <div className="row">
                                                        {
                                                            loading ?
                                                                <div className="d-flex justify-content-center">
                                                                    <div className="spinner-border" role="status">
                                                                        <span className="visually-hidden">Loading...</span>
                                                                    </div>
                                                                </div> :
                                                                <div className="col-12 col-md-8">
                                                                    <label className="float-start mt-2">Bank Name</label>
                                                                    <input className="form-control" type="text" onChange={e => setBankname(e.target.value)}></input>
                                                                    <label className="float-start mt-2">Account Number</label>
                                                                    <input className="form-control" type="text" onChange={e => setAccountno(e.target.value)} ></input>
                                                                    <label className="float-start mt-2">Branch name</label>
                                                                    <input className="form-control" type="text" onChange={e => setBranch(e.target.value)}></input>
                                                                    <label className="float-start mt-2">Bank Address</label>
                                                                    <input className="form-control" type="type" onChange={e => setBankaddress(e.target.value)}></input>
                                                                    <label className="float-start mt-2">IFS Code</label>
                                                                    <input className="form-control" type="text" onChange={e => setIfsccode(e.target.value)}></input>
                                                                </div>

                                                        }

                                                    </div>
                                                    <div className="row mt-4">
                                                        <div className="col-8 col-md-8">
                                                            <button className="btn btn-primary float-end">SUBMIT</button>
                                                        </div>

                                                    </div>


                                                </form>
                                            </div>
                                            <div className="col-12 col-md-6 scroll">
                                                {
                                                    loading ?
                                                        <div className="d-flex justify-content-center">
                                                            <div className="spinner-border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div> :
                                                        <table className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>SR NO</th>
                                                                    <th>BANK NAME</th>
                                                                    <th>ACCOUNT NUMBER</th>
                                                                    <th>BRANCH</th>
                                                                    <th>IFS CODE</th>
                                                                    <th>EDIT</th>
                                                                    <th>DELETE</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {bankdetails && bankdetails.map((o, index) => (
                                                                    <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{o.bankname}</td>
                                                                        <td>{o.accountno}</td>
                                                                        <td>{o.branch}</td>
                                                                        <td>{o.ifsccode}</td>
                                                                        <td><Link href={`http://www.textilediwanji.com/companybedit/${o.srno}`} className="btn btn-success btn-sm">EDIT</Link></td>
                                                                        <td><button className='btn btn-danger btn-sm' onClick={() => handleDelete(o.srno)}>DELETE</button></td>
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
           </Boilerplate>



        </>
    );
}



export default CompanyBankDetails;