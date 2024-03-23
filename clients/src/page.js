import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavbarAdmin from './navbar/NavbarAdmin';
import HeaderAdmin from './navbar/HeaderAdmin';
import NavbarEdu from './navbar/NavbarEdu';
import HeaderTeacher from './navbar/HeaderTeacher';
import NavbarTeacher from './navbar/NavbarTeacher';
import Login from './Wawa/login/login';
import AdminNoti from './pageAdmin/AdminNoti';
import AdminTimeDate from './pageAdmin/AdminTimeDate';
import AdminUser from './pageAdmin/AdminUser';
import EduNoti from './pageEdu/EduNoti';
import RegisResults from './pageEdu/RegisResults';
import CoursesTaught from './pageEdu/CoursesTaught';
import AllRoom from './pageEdu/AllRoom';
import RoomDetail from './oanchisa/RoomDetail';
import OpenCourse from './pageEdu/OpenCourseEdu';
import TeacherNoti from './pageTeacher/TeacherNoti';
import RegisCourse from './pageTeacher/RegisCourse';
import RegisResultsTeacher from './pageTeacher/RegisResultsTeacher';
import CoursesTaughtTeacher from './pageTeacher/CoursesTaughtTeacher';
import AllRoomTeacher from './pageTeacher/AllRoomTeacher';
import CheckRegisResults from './pageTeacher/CheckRegisResults';




function Page() {
    const role = sessionStorage.getItem("role")

    return (

        <Router>

            <div>
            {role === "admin" &&
                    <div>
                        <NavbarAdmin />
                        <HeaderAdmin />
                    </div>
                }
                {role === "edu" &&
                    <div>
                        <NavbarEdu />
                        {/* <HeaderEdu /> */}
                        <HeaderTeacher />
                    </div>
                }
                {role === "teacher" &&
                    <div>
                        <NavbarTeacher />
                        <HeaderTeacher />
                    </div>
                }
            
                <Routes>

                    <Route exact path="/" element={<Login />} />

                    <Route exact path="/AdminNoti" element={<AdminNoti />} />
                    <Route exact path="/AdminTimeDate" element={<AdminTimeDate />} />
                    <Route exact path="/AdminUser" element={<AdminUser />} />

                    <Route exact path="/EduNoti" element={<EduNoti/>} />
                    <Route exact path="/RegisResults" element={<RegisResults />} />
                    <Route exact path="/CoursesTaught" element={<CoursesTaught />} />
                    <Route exact path="/AllRoom" element={<AllRoom />} />
                    <Route exact path="/RoomDetail" element={<RoomDetail />} />
                    <Route exact path="/OpenCourse" element={<OpenCourse />} />

                    <Route exact path="/TeacherNoti" element={<TeacherNoti />} />
                    <Route exact path="/RegisCourse" element={<RegisCourse />} />
                    <Route exact path="/RegisResultsTeacher" element={<RegisResultsTeacher />} />
                    <Route exact path="/CoursesTaughtTeacher" element={<CoursesTaughtTeacher />} />
                    <Route exact path="/AllRoomTeacher" element={<AllRoomTeacher />} />
                    {/* <Route exact path="/2566_ต้น" element={<RoomDetail />} /> */}
                    <Route exact path="/CheckRegisResults" element={<CheckRegisResults />} />

                </Routes>
            </div>
        </Router>

    );
}

export default Page;