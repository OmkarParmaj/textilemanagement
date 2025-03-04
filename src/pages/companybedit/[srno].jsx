


import React, { useEffect, useState } from "react";
import axios from "axios";

// import { useParams, Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { successalert, erroralert } from '../../lib/alert'
import Header from "../Header";
import { useRouter } from "next/router";
import Boilerplate from "../boilerplate";
import Link from "next/link";
import Authentication from "../components/authentication";





const Companybedit = ({ isLoggedIn, setIsLoggedIn }) => {


    const [bankDetails, setBankDetails] = useState({
        bankname: "",
        accountno: "",
        branch: "",
        ifsccode: "",
        bankaddress: ""
    });

    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState("");

    const router = useRouter();

    const { srno } = router.query;
    console.log(srno)

    useEffect(() => {
      
        fetchdata();
    }, [srno]);  // Added isLoggedIn to dependency array

    const fetchdata = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`https://apitextilediwanji.work.gd:5000/companybankedit/${srno}`, { withCredentials: true });
            console.log(res.data[0].bankname)
            if (res.data.length > 0) {
                setBankDetails({
                    bankname: res.data[0].bankname,
                    accountno: res.data[0].accountno,
                    branch: res.data[0].branch,
                    ifsccode: res.data[0].ifsccode,
                    bankaddress: res.data[0].bankaddress

                });
                setLoading(false);

            } else {
                // toast.success("No bank details found.", { position: "top-center", autoClose: 2000, closeOnClick: true });
                erroralert("No bank details found")
            }
        } catch (err) {
            // console.error("Error fetching bank details:", err);
            // toast.success("Failed to fetch bank details.", { position: "top-center", autoClose: 2000, closeOnClick: true });
            erroralert("Failed to fetch bank details")
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBankDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`https://apitextilediwanji.work.gd:5000/companybanked/${srno}`, bankDetails, { withCredentials: true })
            .then(res => {
                // toast.success("Bank details updated successfully.", { position: "top-center", autoClose: 2000, closeOnClick: true });
                successalert("Bank details updated successfully!");

            })
            .catch(err => {
                console.error("Error submitting bank details:", err);
                // toast.success("Error updating bank details.", { position: "top-center", autoClose: 2000, closeOnClick: true });
                erroralert("Error updating bank details")
            });
    };

    // if (!isLoggedIn) {
    //     return <Navigate to='/login' replace />;
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
                            <h3 className=''>Comapany bank edit</h3><div className=""></div><span className='ms-4 mt-1'></span>
                        </div>

                    </div>

                    <div className='row '>
                        <div className='col-12 col-md-12'>
                            <div className='card m-3 border border-0'>
                                <div className='card-body'>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            {
                                                loading ?
                                                    <div className="d-flex justify-content-center">
                                                        <div className="spinner-border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div> :
                                                    <div className="col-12 col-md-6">

                                                        <div className="mb-3">
                                                            <label className="form-label float-start">Bank Name</label>
                                                            <input className="form-control" type="text" name="bankname" value={bankDetails.bankname} onChange={handleInputChange} />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label float-start">Account Number</label>
                                                            <input className="form-control" type="text" name="accountno" value={bankDetails.accountno} onChange={handleInputChange} />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label float-start">Branch Name</label>
                                                            <input className="form-control" type="text" name="branch" value={bankDetails.branch} onChange={handleInputChange} />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label float-start">Bank Address</label>
                                                            <input className="form-control" type="text" name="bankaddress" value={bankDetails.bankaddress} onChange={handleInputChange} />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label float-start">IFS Code</label>
                                                            <input className="form-control" type="text" name="ifsccode" value={bankDetails.ifsccode} onChange={handleInputChange} />
                                                        </div>



                                                    </div>

                                            }

                                        </div>
                                        <div className="row d-flex justify-content-around align-items-center">
                                            <div className='col-6'>
                                                <button className="btn btn-primary">Update</button>
                                            </div>
                                            <div className='col-6 '>
                                                <Link className="btn btn-success ms-4 mobilecompanydetails" href="/companybankdetails">Company Details</Link>
                                            </div>


                                        </div>
                                    </form>
                                </div>


                            </div>

                        </div>




                    </div>

                </div>
            </Boilerplate>





        </>
    );
}


export default Companybedit;





