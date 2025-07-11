'use client'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'

const ProfileCard = () => {
    const cards = useQuery(api.cards.getCard)
    
    return (
        <div className="">
            {cards?.map((card) => (
                <div 
                    key={card._id} 
                    className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                    <h3 className="text-xl font-bold mb-2">{card.fullName}</h3>
                    
                    {card.jobTitle && (
                        <p className="text-gray-600 mb-1">
                            <span className="font-medium">Title:</span> {card.jobTitle}
                        </p>
                    )}
                    
                    {card.company && (
                        <p className="text-gray-600 mb-1">
                            <span className="font-medium">Company:</span> {card.company}
                        </p>
                    )}
                    
                    {card.email && (
                        <p className="text-gray-600 mb-1">
                            <span className="font-medium">Email:</span> {card.email}
                        </p>
                    )}
                    
                    {card.phone && (
                        <p className="text-gray-600 mb-1">
                            <span className="font-medium">Phone:</span> {card.phone}
                        </p>
                    )}
                    
                    {card.website && (
                        <p className="text-gray-600 mb-1">
                            <span className="font-medium">Website:</span> 
                            <a href={card.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">
                                {card.website}
                            </a>
                        </p>
                    )}
                    
                    {card.address && (
                        <p className="text-gray-600 mb-1">
                            <span className="font-medium">Address:</span> {card.address}
                        </p>
                    )}
                    
                    {card.twitter && (
                        <p className="text-gray-600 mb-1">
                            <span className="font-medium">Twitter:</span> 
                            <a href={card.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">
                                {card.twitter}
                            </a>
                        </p>
                    )}
                    
                    {card.linkedin && (
                        <p className="text-gray-600 mb-1">
                            <span className="font-medium">LinkedIn:</span> 
                            <a href={card.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">
                                {card.linkedin}
                            </a>
                        </p>
                    )}
                    
                    {card.github && (
                        <p className="text-gray-600 mb-1">
                            <span className="font-medium">GitHub:</span> 
                            <a href={card.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">
                                {card.github}
                            </a>
                        </p>
                    )}
                </div>
            ))}
        </div>
    )
}

export default ProfileCard