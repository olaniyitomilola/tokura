import React from 'react';
import Header from '../component/Header';
import Body from '../component/Body';

const Layout = () => {
    return (
        <div className="layout-container flex flex-col h-screen select-none">
            <Header />
            <Body />
        </div>
    );
};

export default Layout;
