import { useRouter } from "next/router";
import React from "react";
import Authentication from "../components/authentication";
// import { Navigate, useLocation } from 'react-router-dom';

const Yarngatepassimage = ({ isLoggedIn }) => {

    const router = useRouter();
    const { filename } = router.query;

    // const location = useLocation();
    // const query = new URLSearchParams(location.search);
    // const filename = query.get('filename');

    // if (!isLoggedIn) {
    //     return <Navigate to="/login" replace />;
    // }

    const fileUrl = `https://apitextilediwanji.work.gd/yarninwardimages/${filename}`;


    const auth = Authentication();
 

    if (!auth) {
      return null;
  }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    <img
                        src={fileUrl}
                        style={{ maxWidth: 750, maxHeight: 900 }}
                        alt={filename}
                    />
                    {/* <div>
                        <a href={fileUrl} download={filename} className='btn btn-primary'>
                            Download
                        </a>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Yarngatepassimage;
