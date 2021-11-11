import React from 'react';
import schnauzer from '../../assets/images/schnauzer.jpg'


const PetCard = () => {

    return (
        <div className="container" style={{marginTop : '50px' }}>
        <div className="row">
            <div className="col-md-3">
                <div className="card-sl">
                    <div className="card-image">
                        <img
                            src={schnauzer} alt="By Sebastian Coman Travel from Pexels"/>
                    </div>
                    <div className="card-heading">
                        Max
                    </div>
                    <div className="card-text">
                        Max is a beautiful two year old schnauzer
                    </div>
                    <button className="card-button"> Request</button>
                </div>
            </div>
        </div>  
        </div>
    )
}

export default PetCard;