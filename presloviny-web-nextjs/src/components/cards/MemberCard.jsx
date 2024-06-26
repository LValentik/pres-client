import React from 'react';
import { BASE_URL } from '@/app/config';

const MemberCard = ({ author }) => {
    return (
        <div className="w-64 bg-white shadow-lg shadow-gray-400 rounded-lg overflow-hidden text-black hover:scale-105 transition-all duration-200">
            <img
                src={BASE_URL + author.attributes.picture.data.attributes.url}
                alt={author.attributes.name}
                className="w-full h-64 object-cover"
            />
            <div className="p-4 text-black">
                <h2 className="text-lg font-bold mb-1">{author.attributes.name}</h2>
                <p className="text-black">{author.attributes.positionName}</p>
                <p className="text-black text-sm">{author.attributes.email}</p>
            </div>
        </div>
    );
};

export default MemberCard;