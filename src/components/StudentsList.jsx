// src/components/StudentsList.js
import React, { useContext, useState } from 'react';
import { StudentsContext } from '../context/StudentsContext';

const StudentsList = () => {
  const { state, addStudent, deleteStudent, updateStudent } = useContext(StudentsContext);
  const [newStudent, setNewStudent] = useState({ firstName: '', lastName: '', group: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByGroup, setSortByGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');

  const handleDelete = (id) => {
    deleteStudent(id);
  };

  const handleAdd = () => {
    if (newStudent.firstName && newStudent.lastName && newStudent.group) {
      addStudent(newStudent);
      setNewStudent({ firstName: '', lastName: '', group: '' });
    } else {
      alert('Please fill out all fields');
    }
  };

  const handleUpdate = (student) => {
    updateStudent(student);
  };

  const handleSortByGroup = () => {
    setSortByGroup(!sortByGroup);
  };

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const filteredStudents = state.students.filter(student => {
    return student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           student.lastName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  let sortedStudents = sortByGroup ?
    [...filteredStudents].sort((a, b) => a.group.localeCompare(b.group)) :
    [...filteredStudents];

  if (selectedGroup) {
    sortedStudents = sortedStudents.filter(student => student.group === selectedGroup);
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Students List</h2>

      {/* Search and Sort Controls */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-secondary mt-2 me-2" onClick={handleSortByGroup}>
          {sortByGroup ? 'Sort by Name' : 'Sort by Group'}
        </button>
        <select className="form-select mt-2" value={selectedGroup} onChange={handleGroupChange}>
          <option value="">Select Group</option>
          {/* Dynamically generate options based on available groups */}
          {state.students.map(student => (
            <option key={student.group} value={student.group}>{student.group}</option>
          ))}
        </select>
      </div>

      {/* Add Student Form */}
      <div className="mb-3">
        <h4>Add New Student</h4>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              value={newStudent.firstName}
              onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              value={newStudent.lastName}
              onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
            />
          </div>
          <div className="col">
            <select
              className="form-select"
              value={newStudent.group}
              onChange={(e) => setNewStudent({ ...newStudent, group: e.target.value })}
            >
              <option value="">Select Group</option>
              {/* Dynamically generate options based on available groups */}
              {state.students.map(student => (
                <option key={student.group} value={student.group}>{student.group}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <button className="btn btn-primary" onClick={handleAdd}>Add</button>
          </div>
        </div>
      </div>

      {/* Students List */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.group}</td>
              <td>
                <button className="btn btn-info btn-sm me-2" onClick={() => handleUpdate(student)}>Update</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsList;
