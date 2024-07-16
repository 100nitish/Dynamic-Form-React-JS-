import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = () => {
    const [data, setData] = useState([]); 
    useEffect(() => {
        axios.get("https://datausa.io/api/data?drilldowns=Nation&measures=Population")
            .then((res) => {
                setData(res.data.data); 
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            {data.map((post, index) => { 
                const { Nation, Year, Population } = post;
                return (
                    <div className='rr' key={index}>
                        <h2>{Nation}</h2>
                        <h2>{Year}</h2>
                        <h2>{Population}</h2>
                    </div>
                );
            })}
        </div>
    );
};

export default API;
