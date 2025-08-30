import { FaClock, FaCreditCard, FaLaptop  } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { useState, useEffect, useContext } from "react";
import { Toaster, toast } from 'sonner';
import CartItemContext from "../context/CartItemContext";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const Mentorship = () => {
    const { FullScreen } = useStateContext();
    const {cartItem, setCartItem} = useContext(CartItemContext);
    const navigate = useNavigate()
    const [mentorship, setMentorship] = useState(false)
    const addToCart = (id)=> {
        if (!cartItem.some((item)=> item.id === id)) {
            toast.success(`successfully added to cart`)
            setCartItem(prev => [...prev, {id: 111, name: "Mentorship", price: 500}])
        }
        else {
            toast.error("Already in the cart")
            setTimeout(() => {
                navigate("/checkout")
            }, 2500);
        }
    }
    useEffect(()=> {
        localStorage.setItem("COURSE-CART", JSON.stringify(cartItem))
    },[cartItem]);

  return (
    <>
        <section className="mentorship">
            <div className="text-center px-10 md:px-0 py-10 pt-24 md:pt-36 text-white">
                <h1 className="font-bold text-xl md:text-4xl pb-4 lg:pb-20">Why Our Mentorship Makes All The Difference</h1>
                <p className="w-full md:w-1/2 text-sm md:text-lg mx-auto"> We believe in the power of mentorship to transform lives and empower individuals to reach their full potential. Our mentorship program is designed to provide guidance, support, and valuable insights to help you navigate your career journey and secure your dream job.</p>
            </div>
        </section>
        <section className="p-2 py-10 md:p-10">
            <h1 className="text-2xl md:text-4xl text-center font-bold">Program Details</h1>
            <p className="text-sm md:text-lg my-10 font-medium text-center">This is a 5 week mentorship program in career development. You will gain exclusive access to industry events, workshops, and resources that will enhance your professional development. This includes webinars, training materials, and networking events tailored specifically for our mentees. Your mentor can become a trusted advisor and a valuable professional contact even after the mentorship program</p>
        </section>
        <section className="p-2 md:p-10">
            <div className="p-4 md:p-6 rounded-xl bg-BLUE text-white">
                <h1 className="text-xl md:text-4xl font-bold">What you stand to benefit</h1>
                <div className="benefit py-3">
                    <ul className="text-xs md:text-base">
                        <li>Exclusive access to knowledge and experience</li>
                        <li>Career growth oppurtunities</li>
                        <li>Lifelong connections</li>
                        <li>Accelerated learning and networking oppurtunities</li>
                    </ul>
                </div>
            </div>
        </section>
        <section className="others py-16 md:py-20">
            <div className="md:px-10 py-10 px-2 flex justify-between items-center text-center font-bold">
                <div className="flex flex-col items-center gap-2">
                    <FaCalendarDays size={FullScreen ? 30 : 20} />
                    <p>5 Weeks</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <FaClock size={FullScreen ? 30 : 20} />
                    <p>222</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <FaLaptop size={FullScreen ? 30 : 20} />
                    <p>Virtual</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <FaCreditCard size={FullScreen ? 30 : 20} />
                    <p>$500</p>
                </div>
            
            </div>
            <div className="text-center">
                {mentorship ?
                <button onMouseLeave={()=>setMentorship(false)} onClick={()=> addToCart(111)} className="w-32 font-bold md:px-3 md:py-2 px-2 py-2 hover:text-BLUE hover:bg-white rounded-md border-[1px] text-white">Add To Cart</button>
                : 
                cartItem.some((item)=> item.id === 111) ?
                <button onClick={()=> addToCart(111)} className="w-32 font-bold md:px-3 md:py-2 px-2 py-2 hover:text-BLUE hover:bg-white rounded-md border-[1px] text-white">Add To Cart</button>
                :
                <button onMouseEnter={()=>setMentorship(true)}  className="w-32 font-bold md:px-3 md:py-2 px-2 py-2 hover:text-BLUE hover:bg-white rounded-md border-[1px] text-white">Register</button>}
            </div>
        </section>

        <Toaster position="top-center" />
    </>
  )
}

export default Mentorship