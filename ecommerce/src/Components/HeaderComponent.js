import { Navbar, Nav, Container } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../actions/auth_actions';
import { FaBars} from 'react-icons/fa'

function Header(props) {


    const sidebarOpen=props.value;
    const ToggleSideBar=()=>{
        props.onChange(!sidebarOpen);
    }
    
    const auth=useSelector(state => state.auth);
    const dispatch= useDispatch();
        const logout =() =>{
            dispatch(signout());
        }
    
        const renderLoggedInLinks = () =>{
            return(
                <Nav className="ml-auto">
                    <span onClick={logout} className="nav-link">Signout</span>
                </Nav>
            );
            
        }
        const renderNonLoggedInLinks = () =>{
            return(
                <Nav className="ml-auto">
                    <NavLink to="/login" className="nav-item nav-link">SignIn</NavLink>
                    <NavLink to="/register" className="nav-item nav-link">SignUp</NavLink>
                </Nav>
            );
            
        }
        return (
            <div style={{height:"50px"}}>
                <Navbar style={{ zIndex:4}} fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark" >
                    <Container fluid>
                        <Nav className="mr-auto">
                            <span onClick={ToggleSideBar} className="nav-link"><FaBars/></span>
                        </Nav>
                        <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
        
    }
    
    export default Header;