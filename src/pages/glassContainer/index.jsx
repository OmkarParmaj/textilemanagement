  // GlassContainer.js
  import React from 'react';
import Authentication from '../components/authentication';
  // import '../Assets/GlassContainer.css'; 

  const GlassContainer = ({ children }) => {

    const auth = Authentication();
 

    if (!auth) {
      return null;
  }

    return (
      <div className="glass-container">
        {children}
      </div>
    );
  };

  export default GlassContainer;
