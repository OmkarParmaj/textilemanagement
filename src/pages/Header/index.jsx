"use client"

// import '../Assets/sidebar.css';
// import { FcBusinessman } from "react-icons/fc";
import { IoMenuSharp } from "react-icons/io5";
// import '../Assets/header.css';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import Cookies from "js-cookie";
// import GlassContainer from '../Pages/GlassContainer';

import { TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";


// import { Navigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { useEffect, useState } from 'react';
// import GlassContainer from "../glassContainer";
import Link from "next/link";
import { useRouter } from "next/router";
import GlassContainer from "../glassContainer";
import Authentication from "../components/authentication";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {



    const router = useRouter();
    const [companyname, setCompanyname] = useState("");


    const [loading, setLoading] = useState(false);


    useEffect(() => {
        axios.get('https://apitextilediwanji.work.gd/headerinfo', { withCredentials: true })
            .then(res => {
                const company = res.data[0].Name;
                // console.log(res.data);

                setCompanyname(company);

            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    // const handlelogout = () => {
    //    return setIsLoggedIn(false);
    // }
    // const handleLogout = async () => {
    //     setLoading(true)

    //     try {
    //         const res = await axios.post('https://apitextilediwanji.work.gd/logout', {}, { withCredentials: true });

    //         setIsLoggedIn(false);
    //         // window.location.href = '/loggedout';

    //         setLoading(false);

    //     } catch (err) {
    //         console.error('Logout error:', err.response ? err.response.data : err.message);

    //     }







    // const handlelogout = () => {
    //     setLoading(true);
    //     Cookies.remove('token');
    //     setLoading(false);
    //     router.push('/login');


    // }


    const auth = Authentication();


    if (!auth) {
        return null;
    }


    return (
        <>

            <div className='row  computerheader shadow-sm mobileheader'>
                <ToastContainer></ToastContainer>
                <div className='col-12 col-sm-2 d-flex justify-content-end me-3'>
                    <span><IoMenuSharp className='menubuttonformobilesidebar' data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" /></span>
                    <div className=' mt-1'>
                        <div className="dropdown">
                            <button className="border-0 bg-white " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <Stack direction="row" spacing={2}>

                                    <Avatar>O</Avatar>
                                </Stack>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" style={{ right: "0", left: "auto" }}>
                                <li><span className="dropdown-item text-center">{companyname}</span></li>
                                <li className='mt-1'><Link href="/dashboard" className="dropdown-item text-center"  ><IoHomeOutline /><span className="ms-2">HOME</span></Link></li>
                                <li className='mt-1'><Link href="/profilesetting" className="dropdown-item text-center" ><CgProfile /><span className="ms-2">PROFILE</span></Link></li>
                                <li className='mt-1'><button className="dropdown-item text-center" onClick={handlelogout}  ><TbLogout2 />
                                    <span className="ms-2" onClick={handlelogout}>LOG OUT</span></button></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>


            <div>
                {
                    loading === true ?
                        <GlassContainer>
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>




                        </GlassContainer> :

                        <div></div>
                }
            </div>


        </>
    );
}


export default Header;
