import React from 'react';
import { Routes, Route } from "react-router-dom";

// Screen
import { Course } from '../components/screens/course/Course';
import { Grade } from '../components/screens/course/Grade';
import { Create } from '../components/screens/course/Create';
import { Student } from '../components/screens/course/Student';
import { Detour } from '../components/screens/course/Detour';
import { Qualification } from '../components/screens/course/Qualification';

//Ui
import { Navbar } from '../components/ui/Navbar';


export const DashboardRouter = () => {
    return (
        <>
            <Navbar />

            <div className="container">
                <Routes>
                    <Route path="detour" element={<Detour />} />
                    
                    <Route path="course" element={<Course />} />
                    <Route path="grade/:courseId" element={<Grade />} />
                    <Route path="createCourse" element={<Create />} />
                    
                    <Route path="createStudent" element={<Student />} />

                    <Route path="createStudent" element={<Student />} />
                    
                    
                    <Route path="qualification" element={<Qualification />} />

                    <Route path="/" element={<Detour />} />

                </Routes>
            </div>

        </>
    )
}
