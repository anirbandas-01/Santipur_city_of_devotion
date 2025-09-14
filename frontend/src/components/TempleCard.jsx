import React from "react";

const TempleCard = ({ temple }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition">
            <img src={temple.img} alt={temple.name} className="rounded-lg h-48 w-full object-cover" />
            <h2 className="text-xl font-semibold mt-3">{temple.name}</h2>
            <p className="text-gray-600">{temple.location}</p>
            <p className="mt-3 text-gray-700">{temple.desc}</p>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">view more</button>
            
        </div>
    );
};


export default TempleCard;