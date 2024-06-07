import { useEffect, useState } from 'react';

import Banner from './Banner/Banner';
import FeatureSection from './FeatureSection/FeatureSection';
import HowWorks from './HowWorks/HowWorks';
import Testimonials from './Testimonials/Testimonials';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';
import TopEarners from './TopEarners/TopEarners';


const Home = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Simulate a network request or some async operation
        setTimeout(() => {
            setLoading(false);
        }, 2000); // Adjust the timeout duration as needed
    }, []);
    if (loading) return <LoadingSpinner></LoadingSpinner>;
    return (
        <div>
            <Banner></Banner>
            <FeatureSection></FeatureSection>
            <HowWorks></HowWorks>
            <TopEarners></TopEarners>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;