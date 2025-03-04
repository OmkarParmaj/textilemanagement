



import React, { useEffect, useState } from "react";

import axios from "axios";


import { successalert, erroralert } from '../../lib/alert'



// import { Navigate } from 'react-router-dom';

import { FaDashcube } from "react-icons/fa6";

import { IoMdSettings } from "react-icons/io";
import Header from '../Header';
import Link from "next/link";
import Boilerplate from "../boilerplate";
import Authentication from "../components/authentication";






const CompanyRegistration = ({ isLoggedIn, setIsLoggedIn }) => {

    const [values, setValues] = useState({
        companyname: "",
        personname: "",
        companyaddress: "",
        phoneno: "",
        emailid: "",
        gst: ""
    });
    const [file, setFile] = useState(null);
    const [comdata, setComdata] = useState([]);
    const [alert, setAlert] = useState("");

    const [cname, setCname] = useState("");
    const [cpname, setCpname] = useState("");
    const [caddress, setCaddress] = useState("");
    const [cphone, setCphone] = useState("");
    const [cgst, setCgst] = useState("");
    const [filename, setFilename] = useState(null);
    const [cemail, setCemail] = useState("");
    const [loading, setLoading] = useState(false);








    const handleeditfetchdata = (srno) => {
        axios.get(`https://apitextilediwanji.work.gd/handleeditfetchdata/${srno}`, { withCredentials: true })
            .then(res => {

                setCname(res.data[0].companyname);
                setCpname(res.data[0].personname);
                setCaddress(res.data[0].companyaddress);
                setCphone(res.data[0].phoneno);
                setCgst(res.data[0].gst);
                setFilename(res.data[0].filenameas)
                setCemail(res.data[0].emailid);

            })
            .catch(err => {
                // console.log(err);
            })
    }



    const handleeditedsubmit = (e, srno) => {
        e.preventDefault();

        const values = {
            name: cname,
            person: cpname,
            address: caddress,
            phone: cphone,
            gst: cgst,
            cemail: cemail

        }

        axios.put(`https://apitextilediwanji.work.gd/handleeditedsubmit/${srno}`, values, { withCredentials: true })
            .then(res => {

                if (res.data.message === "updated success") {
                    // toast.success("Company details updated successful", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Company details updated successfully!");
                }

            })
            .catch(err => {
                // console.log(err);
            })
    }




































    const handleFileChange2 = e => {
        setFilename(e.target.files[0]);
    }


    const val = (valu) => (e) => {
        setValues({ ...values, [valu]: e.target.value });
    }

    const handleFileChange = e => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        fetchdata();
    }, []);


    const fetchdata = async () => {
        try {
            setLoading(true)
            const res = await axios.get('https://apitextilediwanji.work.gd/companyreport', { withCredentials: true })
            setComdata(res.data);
            setLoading(false);


        } catch (err) {
            // console.log(err);
        }
    }


    // if (!isLoggedIn) {
    //     return <Navigate to="/login" replace />;
    // }

    const handleChange = (value) => (e) => {
        setValues({ ...values, [value]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('companyname', values.companyname);
        formData.append('personname', values.personname);
        formData.append('companyaddress', values.companyaddress);
        formData.append('phoneno', values.phoneno);
        formData.append('emailid', values.emailid);
        formData.append('gst', values.gst);
        formData.append('file', file);

        axios.post('https://apitextilediwanji.work.gd/companyregister', formData, { withCredentials: true })
            .then(res => {
                setValues({
                    companyname: "",
                    personname: "",
                    companyaddress: "",
                    phoneno: "",
                    emailid: "",
                    gst: ""
                }); // Clear form fields after successful submission
                if (res.data.message === "data inserted successfully") {
                    // toast.success("Data submitted successfully", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Data submitted successfully!");
                    fetchdata(); // Update comdata with the latest data from the server
                }
            })
            .catch(err => {
                console.error("Error in sending data:", err);
            });
    };


    const handledelete = (id) => {
        axios.delete(`https://apitextilediwanji.work.gd/companydelete/${id}`, { withCredentials: true })
            .then((res) => {
                fetchdata();
            })
            .catch((err) => {
                // console.log("err in the delete", err);
            })
    }

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

                                        <li className="breadcrumb-item active" aria-current="page"><IoMdSettings className='me-2' />company registration</li>
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
                                            <h4 className="text-start ms-4 mt-2">COMPANY REGISTRATION</h4>
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
                            <div className='card m-3 border border-0 companycard '>
                                <div className='card-body'>
                                    <div className="row mt-5">

                                        <div className="col-12 col-md-5">
                                            <form onSubmit={handleSubmit}>
                                                <div className="row d-flex ">



                                                    <div className="col-12 col-md-6">
                                                        <label className="form-label float-start">Company Name</label>
                                                        <input className="form-control" onChange={val("companyname")} id="companyname"></input>
                                                        <label className="form-label float-start">Person Name</label>
                                                        <input className="form-control" onChange={val("personname")} id="personname"></input>
                                                        <label className="form-label float-start">Company address</label>
                                                        <input className="form-control" onChange={val("companyaddress")} id="companyaddress"></input>
                                                        <label className="form-label float-start">LOGO</label>
                                                        <div className="input-group mb-3">
                                                            <input type="file" name="companyimage" className="form-control" id="inputGroupFile02" onChange={handleFileChange} />
                                                        </div>

                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <label className="form-label float-start">Phone No</label>
                                                        <input className="form-control" onChange={val("phoneno")} id="phoneno"></input>
                                                        <label className="form-label float-start">Email ID</label>
                                                        <input className="form-control" onChange={val("emailid")} id="emailid"></input>
                                                        <label className="form-label float-start">GST NO</label>
                                                        <input className="form-control" onChange={val("gst")} id="gst"></input>

                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <button className="btn btn-success float-end mobilesubmitbutton" type="submit">SUBMIT</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                        <div className="col-12 col-md-6 tablesection bg-light border border-1 rounded-3 " style={{ height: "1500px" }} >
                                            <div className='row scroll'>
                                                <h4 className="mt-3 text-center">Company's'</h4>
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
                                                                    <th>Company Name</th>
                                                                    <th>Logo</th>
                                                                    <th>Proprietor Name</th>
                                                                    <th>Action</th>
                                                                    <th>Action</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {comdata.map((company, index) => (
                                                                    <tr key={index}>
                                                                        <td>{company.companyname}</td>
                                                                        <td><img src={`https://apitextilediwanji.work.gd/companyimage/${company.filenameas}`} style={{ maxWidth: 250, maxHeight: 90 }} alt={` ${index}`} /></td>
                                                                        <td>{company.personname}</td>
                                                                        <td>
                                                                            <button className='btn btn-primary btn-sm ' data-bs-toggle="modal"
                                                                                data-bs-target={`#exampleModal-${company.srno}`} onClick={e => handleeditfetchdata(company.srno)}>EDIT</button>

                                                                            <div className="modal fade"
                                                                                id={`exampleModal-${company.srno}`}
                                                                                tabIndex="-1"
                                                                                aria-labelledby={`exampleModalLabel-${company.srno}`}
                                                                                aria-hidden="true">

                                                                                <div className="modal-dialog  modal-dialog-centered">


                                                                                    <div className="modal-content">
                                                                                        <form onSubmit={e => handleeditedsubmit(e, company.srno)}>
                                                                                            <div className="modal-body">

                                                                                                <div className='row'>
                                                                                                    <div className='col-12'>

                                                                                                        <label className='form-label float-start'>Company name</label>
                                                                                                        <input className='form-control' type='text' value={cname} onChange={e => setCname(e.target.value)}></input>
                                                                                                        <label className='form-label float-start'>Person name</label>
                                                                                                        <input className='form-control' type='text' value={cpname} onChange={e => setCpname(e.target.value)}></input>
                                                                                                        <label className='form-label float-start'>Company address</label>
                                                                                                        <input className='form-control' type='text' value={caddress} onChange={e => setCaddress(e.target.value)}></input>
                                                                                                        <label className='form-label float-start'> Company phone no</label>
                                                                                                        <input className='form-control' type='number' value={cphone} onChange={e => setCphone(e.target.value)}></input>
                                                                                                        <label className='form-label float-start'>Email Id</label>
                                                                                                        <input className='form-control' type='text' value={cemail} onChange={e => setCemail(e.target.value)}></input>
                                                                                                        <label className='form-label float-start'>Company gst</label>
                                                                                                        <input className='form-control' type='text' value={cgst} onChange={e => setCgst(e.target.value)}></input>
                                                                                                        <label className='form-label float-start'>LOGO</label>
                                                                                                        <input type="file" name="companyimage" className="form-control" id="inputGroupFile02" onChange={handleFileChange2} />



                                                                                                    </div>

                                                                                                </div>
                                                                                                <div className="row mt-3">
                                                                                                    <div className='col-12 d-flex justify-content-end'>
                                                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                                        <button type="submit" className="btn btn-primary ms-3"
                                                                                                            data-bs-dismiss="modal">UPDATE</button>


                                                                                                    </div>

                                                                                                </div>

                                                                                            </div>



                                                                                        </form>
                                                                                    </div>

                                                                                </div>
                                                                            </div>


                                                                        </td>
                                                                        <td> <button className="btn btn-danger btn-sm" onClick={() => handledelete(company.companyname)}>DELETE</button></td>
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



export default CompanyRegistration;
