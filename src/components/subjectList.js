import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects } from "../redux/studentSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const SubjectList = () => {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.students.subjects);
  const subjectsStatus = useSelector((state) => state.students.subjectsStatus);

  useEffect(() => {
    if (subjectsStatus === "idle") {
      dispatch(fetchSubjects());
    }
  }, [subjectsStatus, dispatch]);

  return (
    <div className="categories col-md-2">
      <h3>Subjects</h3>
      <ul className="category-list">
        {subjects.length > 0 ? (
          subjects.map((subject) => (
            <li key={subject.id}>
              <Link to={`/student?subject=${subject.id}`}>{subject.name}</Link>
            </li>
          ))
        ) : (
          <p>Loading subjects...</p>
        )}
      </ul>
    </div>
  );
};

export default SubjectList;
