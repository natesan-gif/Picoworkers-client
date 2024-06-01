import { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import Banner from './Banner/Banner';
import FeatureSection from './FeatureSection/FeatureSection';
import HowWorks from './HowWorks/HowWorks';
import Testimonials from './Testimonials/Testimonials';


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
            <FeatureSection></FeatureSection>
            <HowWorks></HowWorks>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;