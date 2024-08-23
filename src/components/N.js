import React, { useState } from "react";
import {
  Navbar as NextUINavbar, 
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar
} from "@nextui-org/react";
import { Link,Navigate,useNavigate} from "react-router-dom";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input} from "@nextui-org/react";
import {MailIcon} from './MailIcon.jsx';
import {LockIcon} from './LockIcon.jsx';
import {AcmeLogo} from "./AcmeLogo";
import i2 from '../img/2.jpg'

export default function CustomNavbar() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {isOpen:isOpen1, onOpen:onOpen1, onOpenChange:onOpen1Change} = useDisclosure();
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showSuccessAlert1, setShowSuccessAlert1] = useState(false);
  const [showSuccessAlert2, setShowSuccessAlert2] = useState(false);
  const [showSuccessAlert3, setShowSuccessAlert3] = useState(false);
  const navigate = useNavigate();
  let bfunction=async (e) => {
    e.preventDefault()
    try {
      const response=await fetch('https://backendnodeapiforvendor.onrender.com/vendor/login',{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({email,password})
      })
      const data=await response.json()
      console.log(data)
      if(response.ok)
        {
          console.log("successful");
  
          setName("")
          setEmail("")
          setPassword("")
          setShowSuccessAlert2(true);
          localStorage.setItem("token",data.token)
          localStorage.setItem("firmid",data.fm )
         navigate('/success')
      
       
        }else{
          setShowSuccessAlert3(true)
        }

    } catch (error) {
      console.log(error)
      
    }
    
  }
  let afunction=async(e)=>{
    console.log(name)
    e.preventDefault()
    try {
      const response=await fetch('https://backendnodeapiforvendor.onrender.com/vendor/register',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({name,email,password})
      })
      const data=await response.json()
      console.log(data)
      if(response.ok)
      {
        console.log("successful");

        setName("")
        setEmail("")
        setPassword("")
        setShowSuccessAlert(true);
    
     
      }else{
        setShowSuccessAlert1(true)
      }
      
    } catch (error) {
      console.error(error)
      

    }
  }
  
  return (
    <NextUINavbar>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">VendorHub</p>
      </NavbarBrand>

     

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
           <img src={i2} width={80}/>
            </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="settings" > <Button onPress={onOpen} color="white" color="warning"><pre><b className="text-medium">  Login  </b></pre></Button></DropdownItem>
            <DropdownItem key="team_settings"><Button onPress={onOpen1} color="white" color="warning"><pre><b className="text-medium">Sign Up</b></pre></Button></DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  name="email"
                  onChange={(e)=>setEmail(e.target.value)}
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Username"
                  placeholder="Enter your unique username"
                  variant="bordered"
                  type="email"
                  
                />
                <Input
                name="password"
                onChange={(e)=>setPassword(e.target.value)}
                  endContent={
                    <LockIcon  className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Link >
                  <Button color="primary" onClick={bfunction} onPress={onClose} className="text-white">
                    Sign in
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal 
        isOpen={isOpen1} 
        onOpenChange={onOpen1Change}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <><form  onSubmit={afunction}>
              <ModalHeader className="flex flex-col gap-1">Sign Up</ModalHeader>
              <ModalBody>
              <Input
                  name="name"
                  autoFocus
                  onChange={(e)=>setName(e.target.value)}
                  label="Name"
                  placeholder="Enter your Name"
                  variant="bordered"
                />
                <Input
                name="email"
                onChange={(e)=>setEmail(e.target.value)}
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Username"
                  placeholder="Username must be unique"
                  variant="bordered"
                />
                <Input
                name="password"
                onChange={(e)=>setPassword(e.target.value)}
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Link to=" ">
                  <Button color="primary" type="submit"  onClick={afunction} onPress={onClose} className="text-white">
                    Sign up
                  </Button>
                </Link>
              </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
      {showSuccessAlert && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Success!</strong> Vendor registered successfully.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowSuccessAlert(false)}></button>
        </div>
      )}
         {showSuccessAlert1 && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Sorry</strong> Username already taken
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowSuccessAlert1(false)}></button>
        </div>
      )}
       {showSuccessAlert2 && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>successfully</strong> Login
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowSuccessAlert2(false)}></button>
        </div>
      )}
       {showSuccessAlert3&& (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Sorry</strong>Incorrect Credentials
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowSuccessAlert3(false)}></button>
        </div>
      )}
       {
            localStorage.clear()

          }
    </NextUINavbar>
  );
}
