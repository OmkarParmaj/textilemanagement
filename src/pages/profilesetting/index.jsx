import react, { useEffect, useState } from 'react'


import axios from 'axios';

import {successalert, erroralert} from '../../lib/alert'




import { FaDashcube } from "react-icons/fa6";


import { IoMdSettings } from "react-icons/io";
import Header from '../Header';
import Link from 'next/link';
import Boilerplate from '../boilerplate';
import Authentication from '../components/authentication';


const ProfileSetting = ({ isLoggedIn, setIsLoggedIn }) => {

    const [customer, setCustomer] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneno, setPhoneno] = useState("");





    useEffect(() => {
        getdata();
    }, [])


    const getdata = () => {

        axios.get('http://api.textilediwanji.com/profilesetting', { withCredentials: true })
            .then(res => {
                // console.log(res.data)
                setName(res.data[0].Name);
                setEmail(res.data[0].Email);
                setPhoneno(res.data[0].phoneno);

            })
            .catch(err => {
                console.log(err);
            })

    }





    const handlesubmit = (e) => {
        e.preventDefault();

        const values = {
            Name: name,
            Email: email,
            PhoneNo: phoneno
        }

        axios.put(`http://api.textilediwanji.com/profileedit`, values, { withCredentials: true })
            .then(res => {

                if (res.data.message === "profile updated") {
                    // toast.success("Profile updated", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Profile updated")
                    getdata();
                }

            })
            .catch(err => {
                console.log(err);
            })

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

                                            <li className="breadcrumb-item active" aria-current="page"><IoMdSettings className='me-2' />profile setting</li>
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
                                                <h4 className="text-start ms-4 mt-2">PROFILE SETTING</h4>
                                            </div>
                                            <div className="col-md-6">

                                                {/* <Link to='/setting' className="packingslipbutton text-decoration-none float-end">
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
                                    <form onSubmit={(e) => handlesubmit(e)}>
                                            <div className='row'>
                                           
                                                <div className='col-12 col-md-3'>
                                                    <label className='form-label float-start'>Name</label>
                                                    <input className='form-control' value={name} onChange={(e => setName(e.target.value))}></input>
                                                    <label className='form-label mt-3 float-start'>Email</label>
                                                    <input className='form-control' value={email} onChange={e => setEmail(e.target.value)}></input>
                                                    <label className='form-label mt-3 float-start'>Phone No</label>
                                                    <input className='form-control' value={phoneno} onChange={e => setPhoneno(e.target.value)}></input>

                                                    <button className="btn btn-primary btn-sm mt-3" >SUBMIT</button>


                                                </div>
                                              

                                                <div className='col-md-8 profilemobile '>
                                                    <img src='profilesetting.jpg' alt="profilesetting" style={{height: "300px", width: "300px"}}></img>


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



export default ProfileSetting;