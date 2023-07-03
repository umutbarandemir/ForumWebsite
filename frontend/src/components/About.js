import React, { useEffect, useState } from "react";
import Photo from "../assets/agalar.jpg";
import "../index.css";
const About = () => { 

    return(
        <body>
            <div className="about">
            <h1>4 GENIUS </h1>
            <img src={Photo} alt="about" width={650}  />  
            <h1>Our Contact Mails: </h1> 
            <h3>Umut Baran Demir : umutbarandemir@outlook.com</h3>
            <h3>Furkan Mirza: furkanmirza358@gmail.com</h3>
            <h3>Furkan Ayyildiz: furkan199905@gmail.com</h3>
            <h3>Melihcan Yildiz: melihcanyildiz9@gmail.com</h3>
            </div>
        </body>

    );
}
export default About;