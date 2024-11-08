import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch students data");
    }
  }
);

export const fetchStudent = createAsyncThunk(
  "students/fetchStudent",
  async ({ studentId }) => {
    const response = await axios.get(
      `http://localhost:5000/students/${studentId}`
    );
    return response.data;
  }
);

export const fetchStudentDetails = createAsyncThunk(
  "students/fetchStudentDetails",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/student_details");
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch student details data");
    }
  }
);

export const fetchEvaluations = createAsyncThunk(
  "students/fetchEvaluations",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/evaluations");
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch evaluations data");
    }
  }
);

export const fetchSubjects = createAsyncThunk(
  "students/fetchSubjects",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/subjects");
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch subjects data");
    }
  }
);

export const fetchStudentsSubjects = createAsyncThunk(
  "students/fetchStudentsSubjects",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/students_subjetcs"
      );
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch students subjects data");
    }
  }
);

// Add a new video
export const addNewGrade = createAsyncThunk(
  "students/addNewGrade",
  async (newGrade) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/evaluations",
        newGrade
      );
      return response.data;
    } catch (error) {
      throw Error("Failed to add evaluations");
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    studentDetails: [],
    subjects: [],
    evaluations: [],
    student: {},
    studentsSubjects: [],
    studentsStatus: "idle",
    studentStatus: "idle",
    studentDetailsStatus: "idle",
    subjectsStatus: "idle",
    evaluationsStatus: "idle",
    studentsSubjectsStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.studentsStatus = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.studentsStatus = "succeeded";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.studentsStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchStudent.pending, (state) => {
        state.studentStatus = "loading";
      })
      .addCase(fetchStudent.fulfilled, (state, action) => {
        state.studentStatus = "succeeded";
        state.student = action.payload;
      })
      .addCase(fetchStudent.rejected, (state, action) => {
        state.studentStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchStudentDetails.pending, (state) => {
        state.studentDetailsStatus = "loading";
      })
      .addCase(fetchStudentDetails.fulfilled, (state, action) => {
        state.studentDetailsStatus = "succeeded";
        state.studentDetails = action.payload;
      })
      .addCase(fetchStudentDetails.rejected, (state, action) => {
        state.studentDetailsStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchEvaluations.pending, (state) => {
        state.evaluationsStatus = "loading";
      })
      .addCase(fetchEvaluations.fulfilled, (state, action) => {
        state.evaluationsStatus = "succeeded";
        state.evaluations = action.payload;
      })
      .addCase(fetchEvaluations.rejected, (state, action) => {
        state.evaluationsStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSubjects.pending, (state) => {
        state.subjectsStatus = "loading";
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.subjectsStatus = "succeeded";
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.subjectsStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchStudentsSubjects.pending, (state) => {
        state.studentsSubjectsStatus = "loading";
      })
      .addCase(fetchStudentsSubjects.fulfilled, (state, action) => {
        state.studentsSubjectsStatus = "succeeded";
        state.studentsSubjects = action.payload;
      })
      .addCase(fetchStudentsSubjects.rejected, (state, action) => {
        state.studentsSubjectsStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewGrade.fulfilled, (state, action) => {
        state.evaluations.push(action.payload);
      });
  },
});

export default studentSlice.reducer;
