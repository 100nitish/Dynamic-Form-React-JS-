import React, { useState, useEffect } from 'react';

const DynamicForm = () => {
    const [formData, setFormData] = useState(() => {
       
        const savedData = localStorage.getItem('formData');
        return savedData ? JSON.parse(savedData) : {};
    });

    const [inputs, setInputs] = useState([{ id: Date.now(), value: '' }]);

    useEffect(() => {
        
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    const handleInputChange = (id, value) => {
        const updatedInputs = inputs.map(input =>
            input.id === id ? { ...input, value } : input
        );
        setInputs(updatedInputs);
        setFormData(updatedInputs);
    };

    const addInput = () => {
        setInputs([...inputs, { id: Date.now(), value: '' }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
     
        console.log('Form submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {inputs.map(input => (
                <input
                    key={input.id}
                    type="text"
                    value={input.value}
                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                />
            ))}
            <button type="button" onClick={addInput}>Add Input</button>
            <button type="submit">Submit</button>
        </form>
    );
};

export default DynamicForm;
