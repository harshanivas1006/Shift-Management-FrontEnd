import React, { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

const shiftContext = createContext();

const ProtectedRoute = ({ children }) => {
  const [shift, setShift] = useState([
  { id: 1, staff: 'Alice', date: '2025-06-01', startTime: '10:00', endTime: '16:00' },
  { id: 2, staff: 'Bob', date: '2025-06-02', startTime: '08:00', endTime: '12:00' },
  { id: 3, staff: 'Charlie', date: '2025-06-03', startTime: '09:00', endTime: '13:00' },
  { id: 4, staff: 'David', date: '2025-06-04', startTime: '14:00', endTime: '18:00' },
  { id: 5, staff: 'Eve', date: '2025-06-05', startTime: '07:00', endTime: '11:00' },
  { id: 6, staff: 'Frank', date: '2025-06-06', startTime: '12:00', endTime: '17:00' },
  { id: 7, staff: 'Grace', date: '2025-06-07', startTime: '10:00', endTime: '15:00' },
  { id: 8, staff: 'Hannah', date: '2025-06-08', startTime: '09:00', endTime: '14:00' },
  { id: 9, staff: 'Isaac', date: '2025-06-09', startTime: '08:00', endTime: '12:00' },
  { id: 10, staff: 'Jack', date: '2025-06-10', startTime: '13:00', endTime: '17:00' },
  { id: 11, staff: 'Karen', date: '2025-06-11', startTime: '11:00', endTime: '16:00' },
  { id: 12, staff: 'Leo', date: '2025-06-12', startTime: '06:00', endTime: '10:00' },
  { id: 13, staff: 'Mia', date: '2025-06-13', startTime: '15:00', endTime: '19:00' },
  { id: 14, staff: 'Noah', date: '2025-06-14', startTime: '09:00', endTime: '13:00' },
  { id: 15, staff: 'Olivia', date: '2025-06-15', startTime: '10:00', endTime: '14:00' },
  { id: 16, staff: 'Paul', date: '2025-06-16', startTime: '08:00', endTime: '11:00' },
  { id: 17, staff: 'Quincy', date: '2025-06-17', startTime: '14:00', endTime: '18:00' },
  { id: 18, staff: 'Rachel', date: '2025-06-18', startTime: '07:00', endTime: '12:00' },
  { id: 19, staff: 'Steve', date: '2025-06-19', startTime: '13:00', endTime: '17:00' },
  { id: 20, staff: 'Tina', date: '2025-06-20', startTime: '10:00', endTime: '15:00' }
]
);

  const token = localStorage.getItem('token');
  return token ? <shiftContext.Provider value={{ shift, setShift }}>
    {children}
  </shiftContext.Provider> : <Navigate to="/login" />;
};
export const useShiftContext = () => useContext(shiftContext);

export default ProtectedRoute;
