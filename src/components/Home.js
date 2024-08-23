import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import i7 from "../img/7.jpg"
import i8 from "../img/8.jpg"
import i9 from "../img/9.jpg"
import i10 from "../img/10.jpg"
import i11 from "../img/11.jpg"
import i12 from "../img/12.jpg"
import i13 from "../img/13.jpg"
import { Bounce } from "react-swift-reveal";
let Home=()=>{
    const list = [
        {
          title: "Hello",
          img:i7,
          
        },
        {
          title: "Vendor",
          img:i8,
  
        },
        {
          title: "Manage",
          img: i9,
     
        },
        {
          title: "Your",
          img: i10,
        
        },
        {
          title: "Business",
          img: i11,
        
        },
        {
          title: "In",
          img: i12,
      
        },
        {
          title: "One",
          img: i13,
       
        },
        {
          title: "Place",
          img: i8,
  
        },
      ];
    
      return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {list.map((item, index) => (
            <Bounce>
            <Card shadow="sm"  key={index} isPressable onPress={() => console.log("item pressed")}>
              <CardBody className="overflow-visible p-0">
                <img
                  shadow="sm"
                  className="image-fluid"
                  alt={item.title}
                  className="w-full object-cover h-[140px]"
                  src={item.img}
                  style={{height:'300px'}}
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.title}</b>
               
              </CardFooter>
            </Card>
            </Bounce>
          ))}
        </div>
      );
    
}
export default Home