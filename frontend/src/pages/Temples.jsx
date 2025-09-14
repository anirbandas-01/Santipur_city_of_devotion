import React from "react";
import TempleCard from "../components/TempleCard.jsx"


const Temples = () => {
    const temples = [
        {id:1, name:"abc", location:"abc", desc:"jsj", img:"bv.jpg"},
        {id:2, name:"abc", location:"abc", desc:"jsj", img:"bv.jpg"}
    ];

    return (
       <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Temples of Santipur</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {temples.map(temple => (
                <TempleCard key={temple.id} temple={temple} />
            ))}
        </div>
       </div>
    );
};



export default Temples;