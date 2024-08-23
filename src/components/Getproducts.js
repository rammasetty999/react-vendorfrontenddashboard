import React, { useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue} from "@nextui-org/react";
let Getproducts=()=>{
    let[products,setProducts]=useState([])

    const firmid=localStorage.getItem('firmid')
    const prohandler=async (req,res) => {
      if (!firmid) {
        alert("create a firm first")
   
        return;
      }
   
       try {
        let data=await fetch(`http://localhost:5000/product/getallproducts/${firmid}`)
        let sd=await data.json()
        setProducts(sd)
        console.log(sd)
       } catch (error) {

        console.log(error)
       }
        
    }
    useEffect(()=>{
        prohandler()
    },[])
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 4;
  
    const pages = Math.ceil(products.length / rowsPerPage);
  
    const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return products.slice(start, end);
    }, [page, products]);
    let delpro=async (id) => {
        try {
            const response=await fetch(`https://backendnodeapiforvendor.onrender.com/product/delete-product/${id}`,{
                method:'DELETE'
            })
            if(response.ok)
            {
                setProducts(products.filter((i)=>i._id!=id))
                alert("product deleted successfully")
            }
        } catch (error) {
            alert("failed to delete")
            console.log(error)
        }
        
    }
  
    return(
        <React.Fragment>
           
           {
             <Table 
            aria-label="Example table with client side pagination"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
            classNames={{
              wrapper: "min-h-[222px]",
            }}
          >
            <TableHeader>
            <TableColumn key="productname">Product Name</TableColumn>
                <TableColumn key="price">Price</TableColumn>
                <TableColumn key="image">Image</TableColumn>
                <TableColumn key="delete">delete</TableColumn>
      
            </TableHeader>
            <TableBody items={items} >
              {(item) => (
                <TableRow key={item._id}>
                  {(columnKey) => <TableCell>   {columnKey === 'image' ? (
                          <img
                            src={`https://backendnodeapiforvendor.onrender.com/product/uploads/${item.image}`}
                            alt={item.productname}
                            style={{ width: '50px', height: '50px' }}
                          />
                        ) :columnKey==='delete'? <button onClick={()=>delpro(item._id)}>delete</button>: (
                          item[columnKey]
                        )}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
           }
        </React.Fragment>
    )
}
export default Getproducts 