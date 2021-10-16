import { useState } from 'react';

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert('Please input a task');
      return;
    }

    onAdd({ text, day, reminder });

    setText('');
    setDay('');
    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="textInput">
          Task
          <input
            id="textInput"
            type="text"
            placeholder="Add Task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="dayInput">
          Day & Time
          <input id="dayInput" type="text" placeholder="Add Day & Time" value={day} onChange={(e) => setDay(e.target.value)} />
        </label>
      </div>
      <div className="form-control form-control-check">
        <label htmlFor="reminderInput">
          Set Reminder
          <input id="reminderInput" type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
        </label>
      </div>

      <input className="btn btn-block" type="submit" value="save task" />
    </form>
  );
};

export default AddTask;
