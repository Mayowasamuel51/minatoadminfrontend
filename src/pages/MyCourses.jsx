// this components should display the course for those that have paid for  a course

import { useEffect, useState } from "react";
import COURSES from "../coursesAPI/api";
import { Link } from "react-router-dom";

const api = import.meta.env.VITE_PAID_COURSE;
const myCourses = () => {
  const user = localStorage.getItem("user");
  const [data, setData] = useState([]);

  const fetchCourse = async () => {
    /// this function will check if this student has paid for a course
    try {
      const maintoken = window.localStorage.getItem("ACCESS_TOKEN");
      const response = await fetch(`${api}${user}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${maintoken}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const error = new Error("SORRY NO COURSE BOUGHT YET");
        console.log(error);
        throw error;
      }
      const getdata = await response.json();
      console.log(getdata.response);
      // const find_ =  .filter((findcourse)=>{
      //   return  findcourse.courseName  ===  "Linux"
      // })
      setData(getdata.response);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);
  return (
    <div className="p-2 flex flex-wrap justify-center items-center text-center">
      <h1 className="font-bold text-xl md:text-4xl">
        {data.length ===  1 ?  data
          .filter((findcourse) => {
            return findcourse.courseName === "Linux" 
          })
          .map((course) => {
            return (
              <div key={course._id}>
                {/* <h1>{course.courseName}</h1> */}
                {COURSES.filter((findcourse) => {
                  return findcourse.courseName === "Linux";
                }).map(
                  (course, index) =>
                    index < 6 && (
                      // <Link key={index} to={`/courses/${course.courseName.toLowerCase()}`} className="">
                      <div
                        key={index}
                        className={`rounded-xl`}
                        data-aos-once="true"
                        data-aos-duration="5000"
                        data-aos="fade-up"
                      >
                        <div className="rounded-tr-2xl rounded-tl-2xl">
                          <img
                            src={course.image}
                            className="rounded-tr-2xl rounded-tl-2xl w-full h-[200px] object-cover"
                            alt=""
                          />
                        </div>
                        <div className="text-white p-4 rounded-bl-2xl rounded-br-2xl bg-BLUE">
                          <p className="font-bold text-white text-lg md:my-4 md:text-3xl line-clamp-1 lg:line-clamp-2">
                            {course.courseName}
                          </p>
                          <p className="my-2 font-bold text-sm h-[40px] md:h-auto">
                            {course.intro}
                          </p>
                          {/* <p className="line-clamp-2 text-sm md:text-base text-textColor md:max-w-[70%]">
                            {course.description}
                          </p> */}
                          {/* <p className="font-bold my-5 text-lg md:text-xl">
                            ${course.price}
                          </p> */}
                        </div>
                      </div>
                      // </Link>
                    )
                )}
              </div>
            );
          }) : <h1 className="min-h-screen">YOU HAVE NOT PURCHASED ANY COURSE YET</h1>}
        
      </h1>
    </div>
  );
};

export default myCourses;
