import React, { useEffect,useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
import {AcmeLogo} from "./AcmeLogo.jsx";

export default function Vend() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [sfid, setSfid] = useState(""); 
  const [firmIdExists, setFirmIdExists] = useState(false);
  let dup;

  const menuItems = [
    { name: "Home", path: "/home" },
    { name: "Add Product", path: "/addproduct" },
    { name: firmIdExists && sfid.length > 0 ? sfid : "Add Firm", path: firmIdExists && sfid.length > 0 ? "#" : "/addfirm" },
    { name: firmIdExists ? "Get Products" : "", path: firmIdExists ? "/getproducts" : "#" },
    { name: "Log Out", path: "/logout" }
  ];

  const arr=['home','addproduct','addfirm','getproducts','logout']
  let ffm=async () => {
    try {
      const f1=localStorage.getItem('firmid')
      if(f1 &&  f1 !== "undefined"){
        let ffid=await fetch(`https://backendnodeapiforvendor.onrender.com/firms/${f1}`)
        let firmname1=await ffid.json()
         dup=String(firmname1.a || "")
         setFirmIdExists(true);
       setSfid(dup)
      
       
      }
      else{
        setFirmIdExists(false);
      }
    
      
    } catch (error) {
      console.log(error)
      setFirmIdExists(false);
    }
     }
     useEffect(()=>{
      ffm()

    
     },[])


  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="mt-2">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">VendorHub</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
          <Link color="foreground" className="ab" to='/home'>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" className="ab" to='/addproduct'>
            Add Product
          </Link>
        </NavbarItem>
        <NavbarItem >
        {
            sfid.length > 0 ? <Link className="ab text-warning" >{sfid}</Link> : <Link color="foreground" className="ab" to='/addfirm'>
              Add Firm
            </Link>
          }
        </NavbarItem>
     
   
         <NavbarItem>
         {firmIdExists &&
            <Link color="foreground" className="ab" to='/getproducts'>
              Get Products
            </Link>}
          </NavbarItem>
      
        <NavbarItem>
      
          <Link color="foreground"  className="ab" to='/logout'>
            Logout
          </Link>
        
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          item.name && (
            <NavbarMenuItem key={index}>
              <Link 
                color={
                  index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                className="w-full ab"
                href="#"
                size="lg"
                to={item.path}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          )
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
