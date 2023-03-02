import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
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
               </Link>
            </div>
         </Toolbar>
      </AppBar>  
   );
}

export default Header;