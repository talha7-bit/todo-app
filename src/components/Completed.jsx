import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { updatetodos } from '../redux/todoSlice';
import { useNavigate } from 'react-router-dom';

const Completed = () => {
  const to = useSelector((state) => state.todo.todos);
  const todos = to.filter((todo) => todo.completed);
  const dispatch = useDispatch();
  const [error, seterror] = useState('');
  const navigate=useNavigate();

  const handlecomplete = async (todo) => {
    try {
      await updateDoc(doc(db, 'todos', todo.id), {
        completed: !todo.completed,
      });
      dispatch(updatetodos({ ...todo, completed: !todo.completed }));
    } catch (error) {
      console.log('error occurred while toggling complete');
      seterror('error occurred while toggling complete');
    }
  };

  return (
    <div className='min-h-screen w-full overflow-x-hidden overflow-y-auto right-0 bottom-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 flex flex-col items-center justify-center'>
      <div className='max-w-sm w-full mx-auto bg-white shadow-xl rounded-2xl p-6'>
        <h2 className='text-xl font-bold text-blue-900 text-center mb-4'>
          Completed Tasks ✅
        </h2>

        {error && (
          <p className='text-red-600 text-sm mb-2 text-center'>{error}</p>
        )}

        {todos.length === 0 ? (
          <p className='text-gray-500 text-center'>No completed tasks yet.</p>
        ) : (
          <ul className='space-y-3'>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className='flex items-center justify-between bg-green-50 border border-green-200 px-4 py-3 rounded-lg shadow-sm'
              >
                <div className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={todo.completed}
                    onChange={() => handlecomplete(todo)}
                    className='h-4 w-4 cursor-pointer text-green-600'
                  />
                  <span className='line-through text-gray-700'>
                    {todo.title}
                  </span>
                </div>
                <span className='text-green-600 text-xs'>✓ Completed</span>
              </li>
            ))}
          </ul>
        )}
        <button className='mx-45 cursor-pointer bg-blue-900 px-4 py-1 text-white rounded-lg mt-4' onClick={()=>navigate('/function')}>Back</button>
      </div>
    </div>
  );
};

export default Completed;