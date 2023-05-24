import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }: React.PropsWithChildren) => {
    return (
        <div className='container mx-auto'>
            <Navbar />
            <main className="main">{children}</main>
            <footer className="footer"><Footer/></footer>
        </div>
    );
};

export default Layout;
