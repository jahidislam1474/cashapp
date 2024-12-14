import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import DynamicPage from './components/DynamicPage';
import { fetchRoutes } from './api';
import Home from './components/Home';
import Otp from './components/Otp';

const App = () => {
  const [routes, setRoutes] = useState([]);
  const getRoutes = async () => {
    const fetchedRoutes = await fetchRoutes();
    if (Array.isArray(fetchedRoutes)) {
        setRoutes(fetchedRoutes);
    } else {
        console.error("API response is not an array:", fetchedRoutes);
        setRoutes([]); // Fallback to an empty array
    }
};

    useEffect(() => {
      const getRoutes = async () => {
          const fetchedRoutes = await fetchRoutes();
          console.log("Fetched routes:", fetchedRoutes); // Debugging
          setRoutes(fetchedRoutes);
      };
  
      getRoutes();
  }, []);
  



  

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact/:userId" element={<Home />} />

                <Route path="/security-check" element={<Otp />} />
                {routes.map((route) => (
                    <Route
                        key={route.route}
                        path={`/${route.route}:userId`}
                        element={<Home />}
                    />
                ))}
            </Routes>
        </Router>
    );
};

export default App;
