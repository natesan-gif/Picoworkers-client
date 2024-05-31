import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import error from '../../assets/404.json'
import Lottie from "lottie-react";

const ErrorPage = () => {
	return (
	
		<section className="flex items-center h-full p-16 dark:bg-gray-50 text-black">
				<Helmet>
              <title>Surplus Saver | Error Page</title>  
            </Helmet>
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
				<div className="max-w-md text-center">
				<Lottie animationData={error} > </Lottie>	
			<p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
			<p className="mt-4 mb-8">But dont worry, you can find plenty of other things on our homepage.</p>
			<Link to='/' className="bg-[#416EF0] text-white border border-solid p-2 px-4">Back to homepage</Link>
		</div>
	</div>
</section>
    );
};

export default ErrorPage;