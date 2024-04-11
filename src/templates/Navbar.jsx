import React from "react";
import { NavLink } from "react-router-dom";
import userdefault from "../icons/user.svg"
import logo from "../images/logo.png"
import background from "../images/bg_nav.png"
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Typography,
} from "@material-tailwind/react";

import AuthDetails from "../auth/Authdetails"

export default function Navbar(props) {
    return (
        <nav className="px-10 py-3 z-50 fixed w-full h-fit flex shadow-md shadow-black/50  justify-between items-center bg-fixed bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${background})` }}>
            


            <div className="flex justify-start items-center gap-4">

                <NavLink to="/" className="px-2">
                    <img className="w-40 h-12" src={logo} alt="" />
                </NavLink>

                <NavLink to="/adopt" className="p-2 text-base text-black font-Roboto font-medium hover:text-gray-700">Adopt</NavLink>

                <NavLink to="/shop" className="p-2 text-base text-black font-Roboto font-medium hover:text-gray-700">Shop</NavLink>

            </div>

            <AuthDetails />



            {/*<Menu>
                <MenuHandler>
                    <img className="p-1 size-9" src={userdefault} alt="" />
                </MenuHandler>
                <MenuList>
                    <MenuItem className="hover:bg-red-500">Account Settings</MenuItem>
                    <MenuItem className="hover:bg-gray-500">Logout</MenuItem>
                </MenuList>

            </Menu>*/}

        </nav>
    )

}