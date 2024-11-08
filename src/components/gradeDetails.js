import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewGrade,
  fetchEvaluations,
  fetchStudents,
} from "../redux/studentSlice";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const GradeDetails = () => {
  const { studentid } = useParams();
  const dispatch = useDispatch();
  const evaluations = useSelector((state) => state.students.evaluations);
  const evaluationsStatus = useSelector(
    (state) => state.students.evaluationsStatus
  );
  const students = useSelector((state) => state.students.students);
  const studentsStatus = useSelector((state) => state.students.studentsStatus);

  const [evaluationForm, setEvaluationForm] = useState({
    id: Date.now(), // Tạo ID tự động cho mỗi form
    studentId: studentid,
    grade: "", // giá trị này sẽ là số
    additionalExplanation: "",
  });

  const resetForm = () => {
    setEvaluationForm({
      id: Date.now(), // Tạo lại ID mới cho form khi reset
      studentId: studentid,
      grade: "",
      additionalExplanation: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Kiểm tra nếu field là grade thì chuyển giá trị thành số
    if (name === "grade") {
      setEvaluationForm((prev) => ({
        ...prev,
        [name]: value ? Number(value) : "", // Chuyển giá trị thành số nếu có, nếu không để trống
      }));
    } else {
      setEvaluationForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (evaluationForm.grade || evaluationForm.grade === 0) {
      // Kiểm tra grade có hợp lệ không
      dispatch(addNewGrade(evaluationForm)); // Gửi đánh giá mới vào Redux
      resetForm(); // Reset form sau khi thêm
    }
  };

  useEffect(() => {
    if (studentsStatus === "idle") dispatch(fetchStudents());
  }, [dispatch, studentsStatus]);

  useEffect(() => {
    if (evaluationsStatus === "idle") dispatch(fetchEvaluations());
  }, [dispatch, evaluationsStatus]);

  const getEvaluationbyStudentId = (studentId) => {
    const evaluation = evaluations.filter(
      (evaluation) => evaluation.studentId == studentId
    );
    return evaluation.length > 0 ? evaluation : [];
  };

  const getNameByStudentId = (id) => {
    const student = students.find((student) => student.studentId === id);
    return student ? student.name : "Unknown Name";
  };

  const studentgrades = getEvaluationbyStudentId(studentid);

  return (
    <div className="grade col-md-10">
      <Link style={{ textAlign: "left" }} className="btn btn-success" to={"/"}>
        Back to Home
      </Link>
      <h3 style={{ textAlign: "center" }}>
        {getNameByStudentId(studentid)}'s Grade Details:
      </h3>
      <strong>Add a new grade: </strong>
      <div className="grade-input">
        <form onSubmit={handleSubmit}>
          <input
            name="grade"
            type="number" // Đảm bảo người dùng nhập số
            placeholder="Enter grade"
            value={evaluationForm.grade}
            onChange={handleChange}
            required
          />
          <input
            name="additionalExplanation"
            type="text"
            placeholder="Enter additional explanation"
            value={evaluationForm.additionalExplanation}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary">
            Add new
          </button>
        </form>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Grade</th>
            <th>Explanation</th>
          </tr>
        </thead>
        <tbody>
          {studentgrades.length === 0 ? (
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                No grades found for this student.
              </td>
            </tr>
          ) : (
            studentgrades.map((evaluation) => (
              <tr key={evaluation.id}>
                <td>{evaluation.grade || "Unknown grade"}</td>
                <td>{evaluation.additionalExplanation || "No explanation"}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default GradeDetails;
