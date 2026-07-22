import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import '../style/ChangeManagementForms.css';

const ChangeCalendar = ({ onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Sample change data
  const [changes] = useState([
    {
      id: 1,
      title: 'Server Migration',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 14, 0),
      type: 'major',
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Database Update',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 18, 10, 30),
      type: 'normal',
      status: 'scheduled'
    },
    {
      id: 3,
      title: 'Security Patch',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 22, 16, 0),
      type: 'standard',
      status: 'scheduled'
    },
    {
      id: 4,
      title: 'Network Upgrade',
      date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5, 9, 0),
      type: 'major',
      status: 'scheduled'
    }
  ]);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getChangesForDay = (day) => {
    return changes.filter(change => {
      const changeDate = new Date(change.date);
      return changeDate.getDate() === day && 
             changeDate.getMonth() === currentDate.getMonth() && 
             changeDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const getTypeClass = (type) => {
    switch(type) {
      case 'emergency': return 'emergency';
      case 'major': return 'major';
      case 'standard': return 'standard';
      default: return 'normal';
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const weeks = [];
    let days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayChanges = getChangesForDay(day);
      days.push(
        <div key={day} className="calendar-day">
          <div className="day-number">{day}</div>
          <div className="day-changes">
            {dayChanges.map(change => (
              <div key={change.id} className={`change-indicator ${getTypeClass(change.type)}`}>
                {change.title}
              </div>
            ))}
          </div>
        </div>
      );

      // Start a new row every 7 days
      if ((firstDay + day) % 7 === 0 || day === daysInMonth) {
        weeks.push(<div key={day} className="calendar-week">{days}</div>);
        days = [];
      }
    }

    return weeks;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="change-calendar">
      <div className="calendar-header">
        <button onClick={() => navigateMonth(-1)} className="nav-button">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button onClick={() => navigateMonth(1)} className="nav-button">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div className="calendar-weekdays">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="weekday-header">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {renderCalendar()}
      </div>

      <div className="calendar-legend">
        <h3>Legend</h3>
        <div className="legend-items">
          <div className="legend-item">
            <span className="indicator emergency"></span>
            <span>Emergency Changes</span>
          </div>
          <div className="legend-item">
            <span className="indicator major"></span>
            <span>Major Changes</span>
          </div>
          <div className="legend-item">
            <span className="indicator standard"></span>
            <span>Standard Changes</span>
          </div>
          <div className="legend-item">
            <span className="indicator normal"></span>
            <span>Normal Changes</span>
          </div>
        </div>
      </div>

      <div className="scheduled-changes-list">
        <h3>Scheduled Changes for {monthNames[currentDate.getMonth()]}</h3>
        {changes
          .filter(change => new Date(change.date).getMonth() === currentDate.getMonth())
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map(change => (
            <div key={change.id} className="scheduled-change-item">
              <div className="change-date">
                {new Date(change.date).toLocaleDateString()} at{' '}
                {new Date(change.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="change-title">{change.title}</div>
              <div className={`change-type ${getTypeClass(change.type)}`}>{change.type}</div>
            </div>
          ))
        }
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onClose}>
          Close Calendar
        </button>
      </div>
    </div>
  );
};

export default ChangeCalendar;