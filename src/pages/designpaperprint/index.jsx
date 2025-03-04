import { useRouter } from "next/router";
import React from "react";
import Authentication from "../components/authentication";
// import { useLocation } from "react-router-dom";

const Designpaperprint = ({ isLoggedIn, setIsLoggedIn }) => {
    // const location = useLocation();
    // const query = new URLSearchParams(location.search);
    // const filenameWithPrefix = query.get('designpaper');
    const router = useRouter();

    const filename = router.query.designpaper
    ? router.query.designpaper.replace(/^designpaper[\\/]/, '')  // Replace both '/' and '\'
    : '';

  
  
    console.log(filename);
    // Remove the 'designpaper/' prefix if it exists
    // const filename = filenameWithPrefix ? filenameWithPrefix.replace(/^designpaper\\/, '') : '';

    // Construct the file URL
    const fileUrl = `https://apitextilediwanji.work.gd:5000/designpaper/${filename}`;

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
};

export default Designpaperprint;
