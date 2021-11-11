import React from "react";

const Questionnaire = () => {
// Required Inputs: Questions asked by Owner for Pet
// for each question generate a label for the question and an input for the answers.

    function onSubmit(data) {
        data.preventDefault();
       const results = data.target//.value;
       for(let input of results){
        // TODO: How are we going to use inputs?
        console.log("input:", input.value);
       }
    }

// TEST DATA - TO BE REMOVED
const testQuestions = [
    "Do you like dogs?","Have you looked after dogs before?","Are you a kind person?"
]
    return (
        <main>
        <p>Hello</p>
            <form onSubmit={onSubmit}>
                {testQuestions.map((question, index) => {
                   return ( 
                    <div key={index} className="input-group">
                    <label>
                        {question}
                        <input type="text" className="form-control"/>
                    </label>
                    
                    </div>
                   )
                })}
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default Questionnaire