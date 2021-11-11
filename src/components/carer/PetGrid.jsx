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
        }
    ]

    return (
        <div>
            {pets.map((pet) => 
                <PetCard />
            )}
        </div>
    )
}

export default PetGrid