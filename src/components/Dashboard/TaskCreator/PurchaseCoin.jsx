import { Link } from "react-router-dom";
import Payment from "../../Payment/Payment";


const PurchaseCoin = () => {
    return (
   <div className='w-full min-h-[calc(100vh-400px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
               <div className=" mx-auto text-center space-y-4">
                  <h2 className="pt-6 text-2xl lg:text-4xl font-bold text-black ">
Purchase Coin
          </h2>
        
            </div>
            <div className="grid gap-6 my-16 md:grid-cols-2 lg:grid-cols-4">
			<Link to='/dashboard/payment' className="flex flex-col p-8 space-y-4 rounded-md bg-[#416EF0] text-white">
            
				<p className="text-2xl font-semibold ">
					10 coins =
                    </p>
				<p className="text-2xl font-semibold">
				1 dollar
                    </p>
            
			</Link>
			<div className="flex flex-col p-8 space-y-4 rounded-md bg-[#416EF0] text-white">
                  
				<p className="text-2xl font-semibold ">
					10 coins =
                    </p>
				<p className="text-2xl font-semibold">
				9 dollars
                    </p>
            
			</div>
			<div className="flex flex-col p-8 space-y-4 rounded-md bg-[#416EF0] text-white">
                   
				<p className="text-2xl font-semibold ">
					100 coins =
                    </p>
				<p className="text-2xl font-semibold">
				9 dollars
                    </p>
            
			</div>
			<div className="flex flex-col p-8 space-y-4 rounded-md bg-[#416EF0] text-white">
                   
				<p className="text-2xl font-semibold ">
					500 coins =
                    </p>
				<p className="text-2xl font-semibold">
				19 dollars
                    </p>
            
			</div>
		
                </div>
        </div>
    );
};

export default PurchaseCoin;