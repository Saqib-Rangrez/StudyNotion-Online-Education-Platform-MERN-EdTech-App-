import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import {getCatalogPageData} from "../services/operations/pageAndComponentData"
import {categories} from "../services/apis"
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from 'react-redux';
import Error from "./Error";
import Spinner from '../components/common/Spinner';
import ReviewSlider from '../components/common/ReviewSlider';

const Catalog = () => {

    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [active, setActive] = useState(1);
    // const { loading } = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);

    // Fetch all categories
    useEffect(() => {
        const getCategories = async () => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            // console.log(category_id)
            setCategoryId(category_id);
        }
        getCategories();

    }, [catalogName]);

    useEffect(()=> {
        const getCategoryDetails = async () => {
            setLoading(true);
            try{
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res);
                // console.log("Catalog Page Data",catalogPageData)
            }catch(error){
                console.log(error);
            }
            setLoading(false);
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);

    
    if (!loading && !catalogPageData?.success) {
        return <Error />
    }

    if(loading){
        return  (
            <div className='grid h-[80vh] place-items-center'>
                <Spinner />
            </div>
        )
    }

  return (
    
    <div >
    {
        loading ? (<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center"><Spinner/></div>) : 
        (<div className='text-white flex flex-col space-y-10'>
        <div className='bg-richblack-800 w-full'>
            <div className='w-11/12 max-w-maxContent mx-auto flex flex-col gap-y-5 py-16'>
                <p className="text-sm text-richblack-300">{`Home / Catalog / `}
                    <span className='text-yellow-25'>
                        { 
                            (catalogPageData !== null && catalogPageData?.data.selectedCategory !== undefined) &&
                            catalogPageData?.data.selectedCategory?.name
                        }
                    </span>
                </p>
                <p className="text-3xl text-richblack-5 font-bold">
                    { 
                        (catalogPageData !== null && catalogPageData?.data?.selectedCategory !== undefined) &&
                        catalogPageData?.data?.selectedCategory.name
                    }
                </p>
                <p className="max-w-[870px] text-richblack-300">
                    { 
                        (catalogPageData !== null && catalogPageData?.data?.selectedCategory !== undefined) &&
                        catalogPageData?.data.selectedCategory?.description
                    }
                </p>
            </div>
        </div>

        {/* section-1 */}
        <div className='w-11/12 max-w-maxContent m-auto'>
            <div className='text-4xl font-semibold text-richblack-25'>Courses to get you started</div>
            <div className='flex gap-3 border-b border-richblack-600 mt-4 '>
                <p className={`${active === 1 ? "border-b border-yellow-25 text-yellow-25 " : " text-richblack-200"} px-3 py-1 cursor-pointer`} onClick={() => setActive(1)}>Most Popular</p>
                <p className={`${active === 2 ? "border-b border-yellow-25 text-yellow-25" : " text-richblack-200"} px-3 py-1 cursor-pointer`} onClick={() => setActive(2)}>New</p>
            </div>
            <div className='mt-6'>
                {
                    catalogPageData && catalogPageData?.data?.selectedCategory &&
                    <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses}/>
                }
            </div>
        </div>

        {/* Section-2 */}
        <div className='w-11/12 max-w-maxContent mx-auto'>
            <div className='text-4xl font-semibold text-richblack-25'>
                Top Course in 
                <span>
                {
                    (catalogPageData !== null && catalogPageData?.data?.differentCategory !== undefined) && 
                    ` ${catalogPageData?.data?.differentCategory?.name}`
                }
                </span> 
            </div>
            <div className='mt-6'>
                {
                    catalogPageData && catalogPageData?.data?.differentCategory &&
                    <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses} />
                }
            </div>
        </div>

        {/* Section-3 */}
        <div className='w-11/12 max-w-maxContent mx-auto'>
            <div className='text-4xl font-semibold text-richblack-25'>Frequently Bought</div>
            <div className='py-8'>
                <div className='grid grid-cols-2 md:grid-cols-2 mt-2 gap-x-4 gap-y-2 sm:gap-x-8 sm:gap-y-4'>
                    {   
                        catalogPageData && catalogPageData?.data?.mostSellingCourses &&
                        catalogPageData?.data?.mostSellingCourses?.slice(0,4)?.map((course, index) => (
                            <Course_Card course={course} key={index} Height={"h-[400px]"}/>
                        ))
                    }
                </div>
            </div>
        </div>

        <div className='w-11/12 max-w-maxContent flex flex-col justify-between mx-auto mb-[6rem] text-richblack-5'>
            <h1 className='text-3xl md:text-4xl text-center mx-auto font-bold mb-10'>Review from other learners</h1>
            <ReviewSlider/>
        </div>

        <Footer />
    </div>)
    }
    
    </div>
  )
}

export default Catalog