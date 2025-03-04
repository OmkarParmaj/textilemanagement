import Authentication from "../components/authentication";
import Computersidebar from "../computersidebar";
import Mobilesidebar from "../mobilesidebar";






const Boilerplate = ({ children }) => {


    
  const auth = Authentication();
 

  if (!auth) {
    return null;
}

    return (
        <>

            <div className='container-fluid'>
                <div className='row ' >
                    <div className='col-xxl-2 col-xl-2 col-lg-2 col-sm-0 col-xs-0 sideone'
                        >

                        <Computersidebar></Computersidebar>

                    </div>
                    <div className=' rightone col border'
                       >
                        <Mobilesidebar></Mobilesidebar>

                        {children}

                    </div>
                </div>
            </div>





        </>
    );
}


export default Boilerplate;
