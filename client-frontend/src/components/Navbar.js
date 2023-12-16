import { useNavigate } from "react-router-dom";
import Links from "./NavbarLinks";
import Cookies from "universal-cookie";


const Navbar = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const setAuthToken = (authToken) => {cookies.set('authToken', authToken, { path: '/' });};
    
    const tokenUnloader = () => {
        setAuthToken(null);
        navigate('/login');
    };
    
    return (
        <>
            <div className="navbar">
                <h1 className="logo">SounXpress</h1>
                <Links />
                <button onClick={tokenUnloader} className="btnLogin">
                Sign out
                </button>
            </div>
        </>
    );
}
export default Navbar;