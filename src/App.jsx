import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/common/Navbar"
import Catalog from "./pages/Catalog";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import OpenRoute from "./components/core/Auth/OpenRoute"
import Error from "./pages/Error"
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/Dashboard/MyProfile";
import Settings from "./components/Dashboard/Settings/Settings";
import EnrolledCourses from "./components/Dashboard/EnrolledCourses"
import Cart from "./components/Dashboard/Cart/Index";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import MyCourses from "./components/Dashboard/MyCourses";
import AddCourse from "./components/Dashboard/AddCourse";
import EditCourse from "./components/Dashboard/EditCourse/Index";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import InstructorDashboard from "./components/Dashboard/InstructorDashboard/InstructorDashboard";


function App() {

  const {user} = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">

      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  
        <Route 
          path="/update-password/:id" 
          element={
            <OpenRoute>
              <ResetPassword/>
            </OpenRoute>}/>
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  
        
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route
          path="/dashboard/my-profile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        /> 
          <Route
          path="/dashboard/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        /> 
       
        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
              path="/dashboard/enrolled-courses" 
              element={
                <PrivateRoute>
                  <EnrolledCourses />
                </PrivateRoute>}       
              />
              <Route
                  path="/dashboard/cart" 
                  element={
                    <PrivateRoute>
                      <Cart />
                    </PrivateRoute>}       
              />
            </>

          )
        }

        {
          user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route 
                path="/dashboard/my-courses"
                element={
                <PrivateRoute>
                  <MyCourses />
                </PrivateRoute>}
              />
              <Route 
                path="/dashboard/add-course"
                element={
                <PrivateRoute>
                  <AddCourse />
                </PrivateRoute>}
              />
              <Route 
                path="/dashboard/edit-course/:courseId"
                element={
                <PrivateRoute>
                  <EditCourse />
                </PrivateRoute>}
              />
              <Route 
                path="/dashboard/instructor"
                element={
                <PrivateRoute>
                  <InstructorDashboard />
                </PrivateRoute>}
              />
            </>
          )
        }
        </Route> 

        <Route 
          element={
            <PrivateRoute>
              <ViewCourse/>
            </PrivateRoute>} >  

            {
              user?.accountType === ACCOUNT_TYPE?.STUDENT && (
                <Route 
                  path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={
                  <PrivateRoute>
                    <VideoDetails />
                  </PrivateRoute>
                } />
              )
            }   
        </Route>

        <Route path="/about" element={<AboutUs/>} /> 
        <Route path="/contact" element={<ContactUs/>} /> 
        <Route path="/catalog/:catalogName" element={<Catalog/>} />
        <Route path="/courses/:courseId" element={<CourseDetails/>}/>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
