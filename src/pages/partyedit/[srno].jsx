



import {toast, ToastContainer} from 'react-toastify'


import React, { useEffect, useState } from "react";

// import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import {successalert, erroralert} from '../../lib/alert'
import Header from '../Header';
import { useRouter } from 'next/router';
import Boilerplate from '../boilerplate';
import Link from 'next/link';
import Authentication from '../components/authentication';




const PartyEdit = ({ isLoggedIn, setIsLoggedIn }) => {


 const router = useRouter();

    const { srno } = router.query;

    const [values, setValues] = useState({
        partyname: "",
        personname: "",
        address: "",
        gst: "",
        phoneno: ""

    });


    const [company, setCompany] = useState([]);

    const [alert, setAlert] = useState("");

    // const handlesubmit = (e) => {
    //     e.preventDefault();
    //     axios.post('http://api.textilediwanji.com/party', values)
    //         .then(res => {
    //             console.log(res.data);
    //             if (res.data.message === "Data inserted") {
    //                 setAlert("data submitted successfully");
    //             }
    //         })
    //         .catch(err => {
    //             console.log("err in the submitting database", err);
    //         })

    // }

    useEffect(() => {
        axios.get(`http://api.textilediwanji.com/partyedit/${srno}`, {withCredentials: true})
            .then(res => {
                // console.log(res.data);
                setValues({
                    partyname: res.data[0].partyname,
                    personname: res.data[0].personname,
                    address: res.data[0].address,
                    gst: res.data[0].gst,
                    phoneno: res.data[0].phoneno
                })
            })
            .catch(err => {
                // console.log("err in the fetching data", err);
            })
    }, [])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };



    const handlesubmit = (e) => {
        e.preventDefault();

        axios.put(`http://api.textilediwanji.com/partyedit/${srno}`, values, {withCredentials: true})
            .then(res => {
                if (res.data.message === "party updated") {
                    // toast.success("Party details updated successful", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Party details updated successfully")
                    setValues({
                        partyname: "",
                        personname: "",
                        address: "",
                        gst: "",
                        phoneno: ""
                    })
                }
            })
            .catch(err => {
                // console.log(err);
            })
    }


    // if (isLoggedIn === false) {
    //     <Navigate to="/login" replace></Navigate>
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
                        <ToastContainer></ToastContainer>

                        {/* header section ends here  */}


                        <div className='row pathing mt-4 mb-4'>
                            <div className='col-12 col-sm-12 d-flex justify-content-start '>
                                <h3 className=''>Party Inward</h3><div className="vl"></div><span className='ms-4 mt-1'></span>
                            </div>

                        </div>

                        <div className='row '>
                            <div className='col-12 col-md-12'>
                                <div className='card m-3 border border-0'>
                                    <div className='card-body'>
                                        <form onSubmit={handlesubmit}>
                                            <div className="row">


                                                <div className="col-12 col-md-6">
                                                    <label className="float-start mt-2">Party Name/Firm name</label>
                                                    <input type="text" className="form-control" name="partyname" value={values.partyname} onChange={handleInputChange}></input>
                                                    <label className="float-start mt-2">Person name</label>
                                                    <input type="text" className="form-control" name='personname' value={values.personname} onChange={handleInputChange}></input>
                                                    <label className="float-start mt-2">Address</label>
                                                    <input type="text" className="form-control" name="address" value={values.address} onChange={handleInputChange}></input>

                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label className="float-start mt-2">GST NO</label>
                                                    <input type="text" className="form-control" name="gst" value={values.gst} onChange={handleInputChange}></input>
                                                    <label className="float-start mt-2">Phone no</label>
                                                    <input type="number" className="form-control" name="phoneno" value={values.phoneno} onChange={handleInputChange}></input>
                                                </div>


                                            </div>
                                            <div className="row mt-4  d-flex justify-content-end">
                                                <div className="col-12 col-md-3  d-flex justify-content-center">
                                                    <button className="btn btn-primary" >SUBMIT</button>
                                                    <Link href="/party" className="btn btn-success ms-4">GO BACK</Link>
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



export default PartyEdit;