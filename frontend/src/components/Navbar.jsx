import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    const setActiveClass = ({ isActive }) => (isActive ? "nav-link active fw-bold" : "nav-link");

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Portal Inmobiliario</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className={setActiveClass}>Inicio</NavLink>
                        <NavLink to="/properties" className={setActiveClass}>Propiedades</NavLink>
                        {isAuthenticated && <NavLink to="/profile" className={setActiveClass}>Perfil</NavLink>}
                        {isAuthenticated && <NavLink to="/create" className={setActiveClass}>Publicar</NavLink>}
                    </Nav>
                    <Nav>
                        {!isAuthenticated ? (
                            <>
                                <NavLink to="/login" className={setActiveClass}>Iniciar Sesión</NavLink>
                                <NavLink to="/register" className={setActiveClass}>Registrarse</NavLink>
                            </>
                        ) : (
                            <button className="btn btn-outline-light" onClick={logout}>Cerrar Sesión</button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
