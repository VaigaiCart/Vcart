import React, { Fragment } from 'react';
import Search from './Search';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Image } from 'react-bootstrap';
import { logout } from '../../actions/userActions';

export default function Header() {
  const { isAuthenticated, user } = useSelector(state => state.authState);
  const { items: cartItems } = useSelector(state => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout);
  };

  return (
    <Fragment>
      <div className='promo-bar-wrapper'>
        <p>1-hour delivery within 10 km of Aruppukottai, 8 AM to 8 PM, free for orders over ₹1000!</p>
      </div>
      <nav className="navbar row">
        <div className="headeritem col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img className='logo' width="80%" src="/images/logo1.png" alt='logo img' />
            </Link>
          </div>
        </div>

        <div className="headeritem col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="headeritem col-12 col-md-3 mt-4 mt-md-0 text-center">
          {isAuthenticated ?
            (
              <Dropdown className='d-inline'>
                <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                  <figure className='avatar avatar-nav'>
                    <Image width="50px" src={user.avatar ?? './images/default_avatar.jpg'} />
                  </figure>
                  <span className='headerpname'>{user.name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu >
                  {user.role === 'admin' && <Dropdown.Item onClick={() => { navigate('/admin/dashboard') }} className='text-dark'>DashBoard</Dropdown.Item>}
                  <Dropdown.Item onClick={() => { navigate('/myprofile') }} className='text-dark'>Profile</Dropdown.Item>
                  <Dropdown.Item onClick={() => { navigate('/orders') }} className='text-dark'>Orders</Dropdown.Item>
                  <Dropdown.Item onClick={logoutHandler} className='text-danger'>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )
            :
            <Link to='/login' className="btn" id="login_btn">Login</Link>
          }
          <Link to="/cart">
            <span id="cart" className="ml-3">Cart</span>
            <span className="ml-1" id="cart_count">{cartItems.length}</span>
          </Link>
        </div>
      </nav>
    </Fragment>
  )
}
