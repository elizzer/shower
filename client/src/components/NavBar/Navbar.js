import Cards from "./Cards";
import './navbar.css'

import {Home,Explore,Profile,Settings} from './svg'


function Navbar(){
    
    return(
        <div className="navbar" >
            <div className='card'>
                <Home/>
            </div>
            <div className='card'>
                <Explore/>
            </div>
            <div className='card'>
                <Profile/>
            </div>
            <div className='card'>
                <Settings/>
            </div>
                       
        </div>
    );
}

export default Navbar;