import { Outlet, useLocation } from 'react-router-dom';
import Header from "./components/Layout/Header";

export const Layout = ({ hideHeaderPaths = [] }) => {
    const { pathname } = useLocation();

    return (
        <>
            {!hideHeaderPaths.includes(pathname) && <Header />}
            <Outlet />
        </>
    );
}