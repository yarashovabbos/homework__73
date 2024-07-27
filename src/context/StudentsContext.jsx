// src/context/StudentsContext.js
import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  students: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_STUDENTS':
      return { ...state, students: action.payload };
    case 'ADD_STUDENT':
      return { ...state, students: [...state.students, action.payload] };
    case 'UPDATE_STUDENT':
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.id ? action.payload : student
        )
      };
    case 'DELETE_STUDENT':
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.payload)
      };
    default:
      return state;
  }
};

export const StudentsContext = createContext();

export const StudentsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/students');
        dispatch({ type: 'SET_STUDENTS', payload: response.data });
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const addStudent = async (student) => {
    try {
      const response = await axios.post('http://localhost:3000/students', student);
      dispatch({ type: 'ADD_STUDENT', payload: response.data });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const updateStudent = async (student) => {
    try {
      const response = await axios.put(`http://localhost:3000/students/${student.id}`, student);
      dispatch({ type: 'UPDATE_STUDENT', payload: response.data });
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/students/${id}`);
      dispatch({ type: 'DELETE_STUDENT', payload: id });
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <StudentsContext.Provider value={{ state, addStudent, updateStudent, deleteStudent }}>
      {children}
    </StudentsContext.Provider>
  );
};
