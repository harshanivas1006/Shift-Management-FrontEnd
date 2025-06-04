import React, { useEffect, useState } from 'react';
import { useShiftContext } from '../components/ProtectedRoute';
import { useLocation, useNavigate } from 'react-router-dom';
import './staff.css';


const allStaff = [
  'Alice', 'Bob', 'Charlie', 'David', 'Eve',
  'Frank', 'Grace', 'Hannah', 'Isaac', 'Jack',
  'Karen', 'Leo', 'Mia', 'Noah', 'Olivia',
  'Paul', 'Quincy', 'Rachel', 'Steve', 'Tina'
];


const StaffPage = () => {
  const [search, setSearch] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const navigate = useNavigate();

  const { shift, setShift } = useShiftContext();

  const location = useLocation();
  const { mode, shiftData } = location.state || {};

  useEffect(() => {
    if (mode === 'edit' && shiftData) {
      setIsEdit(true);
      setSelectedUser(shiftData.staff);
      setDate(shiftData.date);
      setStartTime(shiftData.startTime);
      setEndTime(shiftData.endTime);
    } else {
      setIsEdit(false);
    }
  }, [mode, shiftData]);

  const filteredStaff = allStaff.filter((user) =>
    user.toLowerCase().includes(search.toLowerCase())
  );

  const handleAssignSlot = () => {
    if (!selectedUser || !date || !startTime || !endTime) return;
    const lastIndex = shift.length ? shift[shift.length - 1].id : 0;
    const newSlot = {
      id: lastIndex + 1,
      staff: selectedUser,
      date,
      startTime,
      endTime,
    };

    setShift((prev) => [...prev, newSlot]);
    setDate('');
    setStartTime('');
    setEndTime('');
    navigate('/dashboard');
  };


  return (
    <div className="staff-container">
  <h2>Assign Availability Slots</h2>

  <input
    className="search-input"
    type="text"
    placeholder="Search user..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <ul className="staff-list">
    {filteredStaff.map((user) => (
      <li key={user}>
        <button
          className={`staff-btn ${selectedUser === user ? 'active' : ''}`}
          onClick={() => setSelectedUser(user)}
        >
          {user}
        </button>
      </li>
    ))}
  </ul>

  {selectedUser && (
    <div className="form-container">
      <h3>Selected: <span className="highlight">{selectedUser}</span></h3>

      <label>
        Date:
        <input
          className="form-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <label>
        Start Time:
        <input
          className="form-input"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </label>

      <label>
        End Time:
        <input
          className="form-input"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </label>

      <button className="submit-btn" onClick={handleAssignSlot}>
        {isEdit ? 'Update' : 'Add'} Slot
      </button>
    </div>
  )}
</div>
  );
};

export default StaffPage;
