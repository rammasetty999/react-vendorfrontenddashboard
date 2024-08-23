import React ,{useState}from "react";
import {Input,Checkbox} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { json,useNavigate} from "react-router-dom";

export default function AddFirm() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showSuccessAlert1, setShowSuccessAlert1] = useState(false);
  let [firmname,setFirmname]=useState("")
  let [area,setArea]=useState("")
  let[category,setCategory]=useState([])
  let[region,setRegion]=useState([])
  let [offer,setOffer]=useState("")
  let [file,setFile]=useState(null)
  const navigate = useNavigate();
  let ohan=(e)=>{
    let value=e.target.value
    
  
    if(category.includes(value))
    {
      let dup=category.filter((item)=>item!=value)
      setCategory(dup)
    }
    else{
      setCategory([...category,value])
    }
  }
  let bhan=(e)=>{
    let value=e.target.value
    console.log(value)
    if(region.includes(value))
    {
      let dup=region.filter((item)=>item!=value)
      setRegion(dup)
    }
    else{
      setRegion([...region,value])
    }
  }
  let imupload=(e)=>{
    const im=e.target.files[0]
    setFile(im)

  }
  let sub=async (e) => {
    e.preventDefault()
    let token=localStorage.getItem('token')
    try{
      if(!token)
      {
        return alert("login to access / session timeout")
      }
      let fm=new FormData()
      fm.append('firmname',firmname)
      fm.append('area',area)
      category.forEach((value)=>{
        fm.append('category',value)
      })
      region.forEach((value)=>{
        fm.append('region',value)
      })
      
      fm.append('offer',offer)
      fm.append('image', file);
  

      const response=await fetch('https://backendnodeapiforvendor.onrender.com/firms/add-firm',{
        method:'POST',
        headers:{
          'token':token
        },
        body:fm

      });
      const data=await response.json()
      if(response.ok){
        console.log(data)
        setShowSuccessAlert(true);
        alert("Firm added successfully")
        setFirmname("");
      setArea("");
      setCategory([]);
      setRegion([]);
      setOffer("");
      setFile(null);
      localStorage.setItem('firmid',data.fm)
      navigate('/home')
       
      }
      else{
        setShowSuccessAlert1(true);
        setFirmname("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
      }
      
    }
    catch(err)
    {
      console.log(err)
    }
    
  }
  return (
    <center>
     
        <div>
        <Input
      isClearable
     
      type="text"
      label="Firm Name"
      variant="bordered"
     value={firmname}

      name="firmname"
      onClear={() => console.log("input cleared")}
      onChange={(e)=>{setFirmname(e.target.value)}}
      className="max-w-xs"
    />
    <br/>

    <Input
      isClearable
      type="text"
      label="Area"
      variant="bordered"
      name="area"
      value={area}
      
      onClear={() => console.log("input cleared")}
      onChange={(e)=>{setArea(e.target.value)}}
      className="max-w-xs"
    />
    <br/>
    <div  className="m-2">
    <label className="mb-2"><b>Category:</b></label><br/>
 

    <Checkbox color="warning" value="veg" onChange={ohan} className="me-2">Veg</Checkbox>
    <Checkbox  color="warning" value="non-veg" onChange={ohan}>Non Veg   </Checkbox>


    </div>
    <div className="m-2">
        <label className="mb-2"><b>Region:</b></label><br/>
    <Checkbox  color="warning" value="north-indian" className="me-2" onChange={bhan}>North Indian</Checkbox>
    <Checkbox  color="warning" value="south-indian" className="me-2"onChange={bhan}>South Indian</Checkbox>
    <Checkbox  color="warning" value="bakery" onChange={bhan}>Bakery</Checkbox>

    </div>

    <Input
      isClearable
      type="text"
      label="Offer"
      variant="bordered"
     value={offer}
  
      name="offer"
      onClear={() => console.log("input cleared")}
      onChange={(e)=>{setOffer(e.target.value)}}
      className="max-w-xs"
    />
    <input type="file" onChange={imupload} className="mt-5" />
    <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onClick={sub}>
     Add
    </Button>
        </div>
        {showSuccessAlert && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Success!</strong> Firm registered successfully.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowSuccessAlert(false)}></button>
        </div>
      )}
       {showSuccessAlert1 && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Sorry!</strong> Firm exists  .
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowSuccessAlert1(false)}></button>
        </div>
      )}
    </center>
  );
}
