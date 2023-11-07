import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { Player } from 'video-react';
import {AiFillPlayCircle} from "react-icons/ai"
import IconBtn from '../../common/IconBtn';
import { formatDate } from '../../../services/formatDate';



const VideoDetails = () => {

  const {courseId, sectionId, subSectionId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const {token} = useSelector((state) => state.auth);
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures
} = useSelector((state) => state.viewCourse);
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if(!courseSectionData){
        return;
      }
      if(!courseId || !sectionId || !subSectionId){
        navigate("/dashboard/enrolled-courses");
      }else{
        // assume all three fields are present
        const filteredData = courseSectionData?.filter((course) => course._id === sectionId);
        const filteredVideoDetails = filteredData[0]?.subSection?.filter((data) => data._id === subSectionId);
        setVideoData(filteredVideoDetails?.[0]);
        setVideoEnded(false);
      }
    }
    setVideoSpecificDetails();
  }, [courseSectionData, courseEntireData, location.pathname]);
 
  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
      (data) => data._id === subSectionId);

      if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
        return true;
      }else return false;
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId);
    const  noOfSubSections = courseSectionData[currentSectionIndex]?.subSection?.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
      (data) => data._id === subSectionId);

      if(currentSectionIndex === courseSectionData.length-1 && currentSubSectionIndex === noOfSubSections-1){
        return true;
      }else return false;

  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId);
    const  noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
      (data) => data._id === subSectionId);

      if(currentSubSectionIndex !== noOfSubSections-1){
        // same section ki next video
        const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex +1]._id;
        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
      }else{
        // different section ki 1st video
        const nextSectionId = courseSectionData[currentSectionIndex+1]._id;
        const nextSubSectionId = courseSectionData[currentSectionIndex+1].subSection[0]._id;

        // move to next video
        navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
      }
  }

  const goToPreviousVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId);
    const  noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
      (data) => data._id === subSectionId);

      if(currentSubSectionIndex !== 0){
        // same section ki next video
        const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex-1]._id;
        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
      }else{
        // different section ki 1st video
        const prevSectionId = courseSectionData[currentSectionIndex-1]._id;
        const prevSubSectionLenght = courseSectionData[currentSectionIndex-1].subSection.length;
        const prevSubSectionId = courseSectionData[currentSectionIndex-1].subSection[prevSubSectionLenght-1]._id;

        // move to next video
        navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
      }
  }

  const handleLectureCompletion = async () => {
    setLoading(true);
    const response = await markLectureAsComplete({courseId, subSectionId}, token);
    if(response){
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  }

  return (
    <div>
        {
          !videoData ? (
            <div className='relative text-4xl mt-10 text-richblack-25 font-semibold'>No data found</div>
          ) : (
            <Player
                ref = {playerRef}
                aspectRatio={'16:9'}
                playsInline
                onEnded = {() => setVideoEnded(true)}
                src={videoData?.videoUrl}
                className="focus:outline-none active:outline-none rounded-md outline-none"
                >
                  {/* <AiFillPlayCircle /> */}
                  {
                    videoEnded && (
                      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 flex flex-col justify-center gap-2 items-center inset-0 w-full h-full bg-richblack-900 backdrop-blur-sm bg-opacity-20 ' >
                        {
                          !completedLectures?.includes(subSectionId) && (
                            <IconBtn disabled={loading} onClick={() => handleLectureCompletion()} text={!loading ? "Mark as Completed" : "Loading..."}></IconBtn>
                          )
                        }

                        <IconBtn disabled={loading} onClick={() => 
                          {
                            if(playerRef?.current){
                              playerRef?.current?.seek(0);
                              setVideoEnded(false);
                            }
                          }
                        } text={"Rewatch"} ></IconBtn>

                        <div className={`${isFirstVideo() || isLastVideo() ? "flex justify-center" : "flex justify-center gap-4"}`}>
                          {
                            !isFirstVideo() && (
                              <button disabled={loading} onClick={() => goToPreviousVideo()} className='bg-richblack-900 rounded-md px-4 py-2 text-richblack-25'>
                                Prev
                              </button>
                            )
                          }

                          {
                            !isLastVideo() && (
                              <button disabled={loading} onClick={() => goToNextVideo()} className='bg-richblack-900 rounded-md px-4 py-2 text-richblack-25'>
                                Next
                              </button>
                            )
                          }
                        </div>
                      </div>
                      )
                  }
                </Player>
          )
        }

        <div className='flex flex-col gap-2 mt-6 text-richblack-25'>
          <h1 className='text-3xl text-richblack-50 font-semibold '>
            {
              videoData?.title
            }
          </h1>
          <p>
            {
              videoData?.description
            }
          </p>
          <p>
             {formatDate(courseEntireData?.createdAt)}
          </p>
        </div>
    </div>
  )
}

export default VideoDetails