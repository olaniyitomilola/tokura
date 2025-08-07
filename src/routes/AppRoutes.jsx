import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Cart from '../pages/Cart';
import NotFound from '../pages/NotFound';
import ProductPage from '../pages/ProductPage';
import Wigs from '../pages/Wigs';
import Bundles from '../pages/Bundles';
import Layout from '../layout/Layout';
import WigRental from '../pages/WigRental';
import Accessories from '../pages/Accessories';
import ScrollToTop from '../component/ScrollToTop';
import TrackOrder from '../pages/TrackOrders';

const AppRoutes = () => (
    <Router>
        <ScrollToTop/>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="order" element={<TrackOrder />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="wigs" element={<Wigs />} />
                <Route path="bundles" element={<Bundles />} />
                
                {/* <Route path="wigrental" element={<WigRental />} /> */}
                {/* <Route path="accessories" element={<Accessories/>} /> */}
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
);

export default AppRoutes;
