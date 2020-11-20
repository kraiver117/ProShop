import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { logout, getUserDetails } from '../actions/userActions'
import SearchBox from '../components/SearchBox'
import {
    Navbar,
    Nav,
    Container,
    NavDropdown
} from 'react-bootstrap'

const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch(getUserDetails('profile'))

    }, [userInfo, dispatch])

    const logoutHandler = () => {
        dispatch(logout())
    }


    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={({ history }) => <SearchBox history={history} />} />
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <i className='fas fa-shopping-cart'>
                                        Cart
                                    </i>
                                </Nav.Link>
                            </LinkContainer>
                            {
                                userInfo
                                    ? (
                                        <NavDropdown title={userInfo.name} id='username'>
                                            <LinkContainer to='/profile'>
                                                <NavDropdown.Item>
                                                    Profile
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                            <NavDropdown.Item onClick={logoutHandler}>
                                                Logout
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    )
                                    :
                                    <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <i className='fa fa-user'>
                                                Sign In
                                                </i>
                                        </Nav.Link>
                                    </LinkContainer>
                            }
                            {
                                userInfo && userInfo.isAdmin && (
                                    <NavDropdown title='Admin' id='adminMenu'>
                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item>
                                                Users
                                                </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/productlist'>
                                            <NavDropdown.Item>
                                                Products
                                                </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/orderlist'>
                                            <NavDropdown.Item>
                                                Orders
                                                </NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
