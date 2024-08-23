import React,{useState} from "react";
import {Input} from "@nextui-org/react";
import {Checkbox} from "@nextui-org/react";
import {Button} from "@nextui-org/react";


export default function Addproduct() {
  let [productname,setProductname]=useState("")
  let [price,setPrice]=useState("")
  let[category,setCategory]=useState([])
  let [file,setFile]=useState(null)
  let [bestseller,setBestseller]=useState("")
  let [description,setDescription]=useState("")
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showSuccessAlert1, setShowSuccessAlert1] = useState(false);

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
  let imupload=(e)=>{
    const im=e.target.files[0]
    setFile(im)

  }
  let sub=async (e) => {
    e.preventDefault()
    let firmid=localStorage.getItem('firmid')
    let token=localStorage.getItem('token')
    try{
      if(!token)
      {
        return alert("login to access / session timeout")
      }
      if(!firmid){
        return alert("create a firm first")

      }
      let fm=new FormData()
      fm.append('productname',productname)
      fm.append('price',price)
      category.forEach((value)=>{
        fm.append('category',value)
      })
      fm.append('image', file);
      fm.append('bestseller',bestseller)
      fm.append('description',description)
      
    

      const response=await fetch(`https://backendnodeapiforvendor.onrender.com/product/add-product/${firmid}`,{
        method:'POST',
        body:fm

      });
      const data=await response.json()
      if(response.ok){
        console.log(data)
        setShowSuccessAlert(true);
        setProductname("");
        setPrice("");
        setCategory([]);
        setFile(null);
        setBestseller("");
        setDescription("");
  
       
      }
      else{
        setShowSuccessAlert1(true);

  
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
      label="Product"
      variant="bordered"
      name="productname"
      value={productname}
      onClear={() => console.log("input cleared")}
      onChange={(e)=>{setProductname(e.target.value)}}
      className="max-w-xs"
    />
    <br/>

    <Input
      isClearable
      type="text"
      label="Price"
      variant="bordered"
      value={price}
      
      name="price"
      onClear={() => console.log("input cleared")}
      onChange={(e)=>{setPrice(e.target.value)}}
      className="max-w-xs"
    />
    <br/>
    <div  className="m-2">
    <label className="mb-2"><b>Category:</b></label><br/>

    <Checkbox  color="warning" onChange={ohan} value="veg" className="me-2">Veg</Checkbox>
    <Checkbox onChange={ohan} color="warning" value="non-veg">Non Veg   </Checkbox>


    </div>
    
    <Input
      isClearable
      type="text"
      label="Bestseller"
      name="bestseller"
      variant="bordered"
      value={bestseller}
      onClear={() => console.log("input cleared")}
      onChange={(e)=>{setBestseller(e.target.value)}}
      className="max-w-xs mb-3"
    />
     <Input
      isClearable
      type="text"
      label="description"
      name="description"
      variant="bordered"
      value={description}
      onClear={() => console.log("input cleared")}
      onChange={(e)=>{setDescription(e.target.value)}}
      className="max-w-xs"
    />
<input type="file" onChange={imupload} className="mt-5" />
        </div>
        <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onClick={sub}>
      Add
    </Button>
    {showSuccessAlert && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Success!</strong> Product added successfully.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowSuccessAlert(false)}></button>
        </div>
      )}
       {showSuccessAlert1 && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Sorry!</strong> Error in adding 
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowSuccessAlert1(false)}></button>
        </div>
      )}
    </center>
  );
}
