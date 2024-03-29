import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Import components
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
    const role = sessionStorage.getItem("role");

    const notLoggedInPopup = () => {
        Swal.fire({
            icon: "error",
            title: "คุณไม่มีสิทธิ์เข้าถึง",
            text: "กรุณาเข้าสู่ระบบ",
            footer: '<a href="/">เข้าสู่ระบบ</a>'
        });
    };

    const unauthorizedPopup = () => {
        Swal.fire({
            icon: "error",
            title: "คุณไม่มีสิทธิ์เข้าถึง"
        });
    };

    return (
        <Router>
            <div>
                {role === "admin" && (
                    <div>
                        <NavbarAdmin />
                        <HeaderTeacher />
                    </div>
                )}
                {role === "edu" && (
                    <div>
                        <NavbarEdu />
                        <HeaderTeacher />
                    </div>
                )}
                {role === "teacher" && (
                    <div>
                        <NavbarTeacher />
                        <HeaderTeacher />
                    </div>
                )}

                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            role ? (
                                <Navigate to="/AdminNoti" />
                            ) : (
                                <Login />
                            )
                        }
                    />

                    <Route
                        exact
                        path="/AdminNoti"
                        element={
                            role === "admin" ? (
                                <AdminNoti />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/AdminTimeDate"
                        element={
                            role === "admin" ? (
                                <AdminTimeDate />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/AdminUser"
                        element={
                            role === "admin" ? (
                                <AdminUser />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />

                    <Route
                        exact
                        path="/EduNoti"
                        element={
                            role === "edu" ? (
                                <EduNoti />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/RegisResults"
                        element={
                            role === "edu" ? (
                                <RegisResults />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/CoursesTaught"
                        element={
                            role === "edu" ? (
                                <CoursesTaught />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/AllRoom"
                        element={
                            role === "edu" ? (
                                <AllRoom />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/RoomDetail"
                        element={
                            role === "edu" ? (
                                <RoomDetail />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/OpenCourse"
                        element={
                            role === "edu" ? (
                                <OpenCourse />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />

                    <Route
                        exact
                        path="/TeacherNoti"
                        element={
                            role === "teacher" ? (
                                <TeacherNoti />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/RegisCourse"
                        element={
                            role === "teacher" ? (
                                <RegisCourse />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/RegisResultsTeacher"
                        element={
                            role === "teacher" ? (
                                <RegisResultsTeacher />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/CoursesTaughtTeacher"
                        element={
                            role === "teacher" ? (
                                <CoursesTaughtTeacher />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/AllRoomTeacher"
                        element={
                            role === "teacher" ? (
                                <AllRoomTeacher />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/CheckRegisResults"
                        element={
                            role === "teacher" ? (
                                <CheckRegisResults />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default Page;
