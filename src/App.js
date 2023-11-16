import { useState } from 'react';

import OutlineInput from './components/OutlineInput';
import PrimaryButton from './components/PrimaryButton';
import TextButton from './components/TextButton';
import ToDo from './components/ToDo';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [toDoList, setToDoList] = useState([]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const addToDo = () => {
    setToDoList((current) => 
      [...current, { isComplete: false, value: inputValue}]);
    setInputValue('');
  };

  const toggleComplete = (index) => {
    setToDoList((current) => current.map((toDo, toDoIndex) => {
      if (toDoIndex === index) {
        const newToDo = Object.assign({}, toDo);
        newToDo.isComplete = !newToDo.isComplete;
        return newToDo;
      } else {
        return toDo;
      }
    }));
  };

  const onUpdate = (updatedValue, id) => {
    setToDoList(toDoList.map((toDo, toDoIndex) => {
      if (toDoIndex === id) {
        const newToDo = Object.assign({}, toDo);
        newToDo.value = updatedValue;
        return newToDo;
      } else {
        return toDo;
      }
    }));
  };

  const onDel = (id) => {
    setToDoList((current) => current.filter((_, toDoIndex) => toDoIndex !== id));
  }

  const isUncompletedToDo = toDo => !toDo.isComplete;

  const removeAllCompletedTodo = () => {
    setToDoList((current) => current.filter(isUncompletedToDo));
  };

  return (
    <div className="app">
      <h1 className="app-title">To Do List</h1>

      <div className="app-form">
				<OutlineInput
          placeholder="무엇을 해야하나요?"
          value={inputValue}  
          onChange={handleChange}
        />
        <PrimaryButton 
          label="할 일 추가"
          onClick={addToDo}
        />
      </div>

      <div className="app-list">
				{toDoList.map((toDo, index) =>
          <ToDo 
            key={index}
            isComplete={toDo.isComplete}
            value={toDo.value}
            onClick={() => toggleComplete(index)}
            onDel={() => onDel(index)}
            onUpdate={(updatedValue) => onUpdate(updatedValue, index)}
          />
        )}
      </div>

      <div className='app-footer'>
        <TextButton 
          label="완료 목록 삭제"
          onClick={removeAllCompletedTodo}
        />
      </div>
    </div>
  );
}

export default App;