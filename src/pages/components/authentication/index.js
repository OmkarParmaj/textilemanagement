import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

const Authentication = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); 
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        
        if(!token) {
            router.push('/login');
            return;

        }
        
        else if (token) {
            axios
                .get('http://api.textilediwanji.com/authenticatetoken', {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        setIsAuthenticated(true); // Authenticated
                    } else {
                        setIsAuthenticated(false); // Authentication failed
                        router.push('/login'); // Redirect to login
                    }
                })
                .catch(() => {
                    setIsAuthenticated(false); // Authentication failed
                    
                    router.push('/login'); // Redirect to login
                });
        } else {
            setIsAuthenticated(false); // No token, user not authenticated
            router.push('/login'); // Redirect to login
        }
    }, [router]);
  return isAuthenticated;
};

export default Authentication;
