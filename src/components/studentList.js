import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentDetails,
  fetchStudents,
  fetchStudentsSubjects,
  fetchSubjects,
} from "../redux/studentSlice";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Table } from "react-bootstrap";

const StudentList = ({ searchTerm }) => {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students.students);
  const studentDetails = useSelector((state) => state.students.studentDetails);
  const subjects = useSelector((state) => state.students.subjects);
  const studentsSubjects = useSelector(
    (state) => state.students.studentsSubjects
  );

  const studentsStatus = useSelector((state) => state.students.studentsStatus);
  const studentDetailsStatus = useSelector(
    (state) => state.students.studentDetailsStatus
  );
  const subjectsStatus = useSelector((state) => state.students.subjectsStatus);
  const studentsSubjectsStatus = useSelector(
    (state) => state.students.studentsSubjectsStatus
  );

  useEffect(() => {
    if (studentsStatus === "idle") dispatch(fetchStudents());
    if (studentDetailsStatus === "idle") dispatch(fetchStudentDetails());
    if (subjectsStatus === "idle") dispatch(fetchSubjects());
    if (studentsSubjectsStatus === "idle") dispatch(fetchStudentsSubjects());
  }, [
    dispatch,
    studentsStatus,
    studentDetailsStatus,
    subjectsStatus,
    studentsSubjectsStatus,
  ]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subjectIdFromURL = searchParams.get("subject");

  const subjectExists = subjects.some(
    (subject) => subject.id == subjectIdFromURL
  );

  if (subjectIdFromURL && !subjectExists) {
    return (
      <div>
        <h2>No students found for this subject</h2>
      </div>
    );
  }

  const getSubjectIdbyId = (id) => {
    const subject = subjects.find((subject) => subject.id == id);
    return subject ? subject.subjectId : null;
  };

  const getStudentIDsBySubjectId = (subjectId) => {
    return studentsSubjects
      .filter((studentSubject) => studentSubject.subjectId == subjectId)
      .map((studentSubject) => studentSubject.studentId);
  };

  const subjectIdToFilter = subjectIdFromURL
    ? getSubjectIdbyId(parseInt(subjectIdFromURL))
    : null;

  const studentIDsToFilter =
    subjectIdToFilter && studentsSubjects.length > 0
      ? getStudentIDsBySubjectId(subjectIdToFilter)
      : [];

  const filterStudents = subjectIdFromURL
    ? studentIDsToFilter.length
      ? students.filter((student) =>
          studentIDsToFilter.includes(student.studentId)
        )
      : []
    : students;

  const filteredStudents = filterStudents.filter((student) => {
    // Kiểm tra xem student.name có hợp lệ không, nếu không thay thế bằng chuỗi rỗng
    const name =
      student.name && typeof student.name === "string" ? student.name : "";

    // Kiểm tra searchTerm, nếu undefined hoặc null thì thay bằng chuỗi rỗng
    const search =
      searchTerm && typeof searchTerm === "string" ? searchTerm : "";

    return name.toLowerCase().includes(search.toLowerCase());
  });

  const noStudentsFound = filteredStudents.length === 0;

  const getStreetByStudentId = (id) => {
    const student = studentDetails.find((student) => student.studentId === id);
    return student ? student.address.street : "Unknown Street";
  };

  const getCityByStudentId = (id) => {
    const student = studentDetails.find((student) => student.studentId === id);
    return student ? student.address.city : "Unknown City";
  };

  if (
    studentsStatus === "loading" ||
    studentDetailsStatus === "loading" ||
    subjectsStatus === "loading" ||
    studentsSubjectsStatus === "loading"
  ) {
    return <div>Loading data...</div>;
  }

  if (
    studentsStatus === "failed" ||
    studentDetailsStatus === "failed" ||
    subjectsStatus === "failed" ||
    studentsSubjectsStatus === "failed"
  ) {
    return <div>Failed to load data. Please try again later.</div>;
  }

  return (
    <div className="col-md-10">
      <h2>List of Students</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>StudentID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Street</th>
            <th>City</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {noStudentsFound ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No students found for the selected subject or search criteria.
              </td>
            </tr>
          ) : (
            filteredStudents.map((student) => (
              <tr key={student.studentId}>
                <td>{student.studentId}</td>
                <td>{student.name || "Unknown Name"}</td>
                <td>{student.age || "Unknown Age"}</td>
                <td>{getStreetByStudentId(student.studentId)}</td>
                <td>{getCityByStudentId(student.studentId)}</td>
                <td>{student.isRegularStudent ? "Fulltime" : "Applicant"}</td>
                <td>
                  <Link to={`/student/${student.studentId}`}>View Grades</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentList;
