import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import Banner from '../../components/Banner/Banner';

const Home = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Simulate a network request or some async operation
        setTimeout(() => {
            setLoading(false);
        }, 2000); // Adjust the timeout duration as needed
    }, []);
    if (loading) return <Spinner></Spinner>;
    return (
        <div>
            <Banner></Banner>
        </div>
    );
};

export default Home;