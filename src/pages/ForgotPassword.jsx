import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LOGO from "../assets/images/logo.jpg";
import { FaChevronLeft } from "react-icons/fa6";

const ForgotPassword = () => {
    const navigate = useNavigate()
    return (
        <section className="ANIMATE-BG min-h-screen flex justify-center items-center">
                <motion.div exit={{ x: -100, }} className="md:w-[400px] p-5 bg-white rounded-3xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link to="/"><img src={LOGO} className="w-[150px] pl-0" alt="" /></Link>
                        </div>
                    </div>
                    <div className='flex items-center gap-1'>
                        <p onClick={()=> navigate(-1)} className='cursor-pointer'>
                            <FaChevronLeft size={20} color='black' />
                        </p>
                        <p className="font-bold">Forgot Password?</p>
                    </div>
                    <p className="text-sm md:text-sm text-slate-700 font-medium">No need to panic, Kindly enter the email address linked with your account</p>
                    <form>
                        <div className="my-4">
                            <label className="font-bold" htmlFor="email">Email Address
                                <input name="email"
                                    type="text" id="" className="text-base pl-2 h-10 rounded-xl w-full border-2 border-inputColor bg-inputColor" />
                            </label>
                        </div>
                        <button type="submit" className="mt-32 w-full rounded-xl hover:text-BLUE border-2 hover:bg-transparent border-BLUE duration-300 bg-BLUE py-2 font-semibold text-white text-base md:text-xl">Send Code</button>
                    </form>
                </motion.div>
            </section>
    )
}

export default ForgotPassword