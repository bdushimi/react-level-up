import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

function Header() {

   const { totalCount } = useSelector((state) => state.store)

   return (
      <AppBar position="static">
         <Toolbar className='toolbar' >
            <Typography variant="overline">SADA Store</Typography>
            <div className='nav-links'>
               <Link className='link' to="/shop" >
                  <Typography style={{marginRight: "10px"}} variant="overline">Shop</Typography>
               </Link>
               <Link className='link' to="/checkout">
                  <Typography variant="overline">Cart</Typography>
                  <Typography variant="overline" style={{fontWeight: 'bold'}}>({totalCount})</Typography>
               </Link>
            </div>
         </Toolbar>
      </AppBar>  
   );
}

export default Header;