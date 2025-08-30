import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import CartItemContext from "../context/CartItemContext";
import { useStateContext } from "../context/ContextProvider";
import { Toaster, toast } from 'sonner';
import { FaCheck, FaExclamation } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const CheckOut = () => {
  const { cartItem, setCartItem } = useContext(CartItemContext);
  const { token } = useStateContext();
  const navigate = useNavigate();
  const checkOut = ()=> {
    if (!token) {
      toast.error("You have to Login First", {
        cancel: {
          label: <FaXmark />,
        },
        duration: 4000,
        icon: <FaExclamation color="red" />,
      })
      setTimeout(() => {
        navigate("/login")
      }, 5000);
    }
    if (cartItem.length === 0) {
      toast.error("Oops, Your cart is empty", {
        cancel: {
          label: <FaXmark />,
        },
        duration: 4000,
        icon: <FaExclamation color="red" />,
      })
      toast('Would you like to buy a course', {
        action: {
          label: <FaCheck color="green" />,
          onClick: ()=> navigate("/courses")
        },
        cancel: {
          label: <FaXmark color="red" />,
        },
        classNames: {
          actionButton: 'bg-slate-300',
        },
      });
    }
    if (token) {
      navigate("/dashboard/makePayment")
    }
  }
  const removeCourse = (id) => {
    const updatedCart = cartItem.filter((item) => item.id !== id);
    setCartItem(updatedCart);
    localStorage.setItem("COURSE-CART", JSON.stringify(updatedCart));
  };
    
  return (
    <div className="min-h-screen md:px-10 px-2 pt-24 pb-20">
      <h1 className="text-xl md:text-4xl font-black">SHOPPING CART</h1>
      <div>
        <p className="font-semibold text-md flex items-end gap-1 my-3"><p className="font-black text-xl">{cartItem.length}</p> {cartItem.length > 1 ? "COURSES" : "COURSE"} in cart </p>
      </div>
      <section className="grid md:grid-cols-3 grid-cols-1 gap-10">
        <div className="cart-items md:col-span-2">
          {cartItem.length > 0 ? cartItem.map((item)=> (
            <div key={item.id} className="py-4 px-2">
              <div className="flex items-center gap-2 md:gap-4">
                <div>
                  {item.image ? <img src={item.image} className="w-12 aspect-square object-cover rounded-md" alt="" /> : (<div className="w-12 aspect-square bg-BLUE rounded-md"></div>)}
                </div>
                <div className="md:flex-[5]">
                  <p className="text-sm md:text-base font-black">{item.courseName || item.name}</p>
                  <p className="text-xs">{item.intro}</p>
                  <p className="text-xs font-medium line-clamp-1">{item.description}</p>
                </div>
                <div className="flex gap-2 md:gap-4 md:flex-1">
                  <button onClick={()=> removeCourse(item.id)} className="font-bold text-xs text-BLUE">REMOVE</button>
                  <p className="font-black">${item.price}</p>
                </div>
              </div>
            </div>
          )) : <h1 className="col-span-3 flex justify-center items-center font-bold text-base md:text-xl">NO ITEM IN YOUR CART</h1>}
        </div>
        <div className="mb-3">
          <div className="my-8">
            <h1 className="text-slate-600 text-sm font-bold">TOTAL:</h1>
            <p className="font-black text-2xl">${cartItem.map((price)=> price.price).reduce((acc, cur)=> acc + cur , 0)}</p>
          </div>
          <button onClick={checkOut} className="duration-300 bg-BLUE hover:bg-white border-2 border-BLUE hover:text-BLUE w-full text-white font-bold py-3 rounded-xl">CHECKOUT</button>
        </div>
      </section>
      <Toaster position="top-center" />
    </div>
  )
}

export default CheckOut