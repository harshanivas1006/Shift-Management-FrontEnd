import React, { useContext, useState } from 'react';
import dayjs from 'dayjs';
import './calendar.css';
import { FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useShiftContext } from '../components/ProtectedRoute';
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const hours = Array.from({ length: 24 }, (_, i) => i);
const currentYear = dayjs().year();
const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

const CalendarPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { shift, setShift } = useShiftContext();

  const daysInMonth = dayjs(`${selectedYear}-${selectedMonth + 1}`).daysInMonth();
  const dates = Array.from({ length: daysInMonth }, (_, i) =>
    dayjs().set('year', selectedYear).set('month', selectedMonth).set('date', i + 1).format('YYYY-MM-DD')
  );

  const navigate = useNavigate();

  const getShiftStyle = (startTime, endTime) => {
    const startHour = parseInt(startTime.split(':')[0]);
    const endHour = parseInt(endTime.split(':')[0]);
    const width = (endHour - startHour) * 60;
    const left = startHour * 60;
    return {
      position: 'absolute',
      left: `${left}px`,
      width: `${width}px`,
      height: '30px',
      backgroundColor: '#4caf50',
      color: '#fff',
      padding: '2px',
      borderRadius: '4px',
    };
  };

  const handleDelete = (id) => {
    setShift((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div>
      <div className="calendar-controls">
        <select
          className="calendar-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {months.map((month, i) => (
            <option key={i} value={i}>{month}</option>
          ))}
        </select>

        <select
          className="calendar-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>

        <button
          className="add-staff-button"
          onClick={() => navigate('/staff')}
        >
          <FaUserPlus style={{ marginRight: '6px' }} />
          Add Staff
        </button>
      </div>

      <div className="calendar-grid">
        <div className="time-header">
          <div className="day-label"></div>
          {hours.map((hour) => (
            <div key={hour} className="time-cell">
              {`${hour}:00`}
            </div>
          ))}
        </div>

        <div className="calendar-body">
          {dates.map((date) => (
            <div key={date} className="calendar-row">
              <div className="day-label">{dayjs(date).format('DD MMM')}</div>
              <div className="day-row">
                {shift
                  .filter((s) => s.date === date)
                  .map((s, idx) => (
                    <div key={idx} style={getShiftStyle(s.startTime, s.endTime)} className="shift-box">
                      {s.staff} ({s.startTime}-{s.endTime})
                      <div className="icons">
                        <span className="edit-icon" onClick={() => navigate('/staff', { state: { mode: 'edit', shiftData: s } })}>&#9998;</span>
                        <span className="delete-icon" onClick={() => handleDelete(s.id)}>&#10006;</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
