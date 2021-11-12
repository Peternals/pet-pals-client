import React from 'react';
import PetCard from './PetCard';

const PetGrid = () => {
    
    // TEST DATA - TO BE REMOVED
    const pets = [
        {
            name: "Fido",
            description: "Doggy",
        },
        {
            name: "Ollie",
            description: "Otter",
        },
        {
            name: "Simba",
            description: "Lion",
        },
        {
            name: "Mizugocci",
            description: "Mizugocci",
        },
        {
            name: "Doraemon",
            description: "???",
        },
        {
            name: "Hachiko",
            description: "Dog",
        },
    ]

    return (
        <div className="container" style={{marginTop : '50px' }}>
        <div className="row">
            {pets.map((pet) => 
                <PetCard />
            )}
        </div>
        </div>
    )
}

export default PetGrid