import React, { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  doc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import {
  addtodos,
  deletetodos,
  settodos,
  updatetodos,
} from '../redux/todoSlice';
import { useForm } from 'react-hook-form';
import { signOut } from 'firebase/auth';
import { logoutsuccess } from '../redux/authSlice';
import { db } from '../firebase';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Function = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [error, seterror] = useState('');
  const [editid, seteditid] = useState('');
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const user = useSelector((state) => state.auth.user);
  const to = useSelector((state) => state.todo.todos);
  const todos = to.filter((todo) => !todo.completed);

  const fetchtodos = async () => {
    if (!user) return;
    try {
      const q = query(collection(db, 'todos'), where('uid', '==', user.uid));
      const snapshot = await getDocs(q);
      const get = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(settodos(get));
      seterror('');
    } catch (error) {
      console.log('an error occured while fetching todos');
      seterror('an error occured while fetching todos');
    }
  };

  useEffect(() => {
    fetchtodos();
  }, [user]);

  const handleadd = async (todo) => {
    if (!user) return;
    if (todo.title.trim() === '') return;

    if (editid) {
      try {
        await updateDoc(doc(db, 'todos', editid), {
          title: todo.title,
          completed: false,
        });
        dispatch(updatetodos({ id: editid, title: todo.title, completed: false }));
        seteditid('');
        seterror('');
        reset();
      } catch (error) {
        console.log('an error occured while updating todo');
        seterror('an error occured while updating todo');
      }
    } else {
      try {
        const docref = await addDoc(collection(db, 'todos'), {
          title: todo.title,
          completed: false,
          uid: user.uid,
        });
        dispatch(
          addtodos({
            id: docref.id,
            title: todo.title,
            completed: false,
            uid: user.uid,
          })
        );
        seterror('');
        reset();
      } catch (error) {
        console.log('an error occured while adding todo', error.message);
        seterror('an error occured while adding todo');
      }
    }
  };

  const handleedit = (todo) => {
    setValue('title', todo.title);
    seteditid(todo.id);
  };

  const handledelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
      dispatch(deletetodos(id));
      seterror('');
    } catch (error) {
      console.log('an error occured while deleting todo');
      seterror('an error occured while deleting todo');
    }
  };

  const handlelogout = async () => {
    try {
      await signOut(auth);
      dispatch(logoutsuccess());
      seterror('');
      navigate('/login')
    } catch (error) {
      console.log('an error occured while logout');
      seterror('an error occured while logout');
    }
  };

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
    <div className='min-h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 flex flex-col items-center justify-center'>
         <button
            onClick={handlelogout}
            className='px-4 py-2 bg-white rounded-lg text-blue-900 text-md font-semibold mb-2'
          >
            Logout
          </button>
      <div className='w-full max-w-sm mx-auto bg-white shadow-xl rounded-2xl p-6'>
        <h1 className='text-2xl font-bold text-center text-blue-900 mb-4'>
          Todo Manager
        </h1>
        <form
          onSubmit={handleSubmit(handleadd)}
          className='flex items-center gap-2 mb-4'
        >
          <input
            type='text'
            placeholder='Enter your task here'
            {...register('title', { required: true })}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900'
          />
          <button
            type='submit'
            className='px-4 py-2 cursor-pointer bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition'
          >
            {editid ? 'Update' : 'Add'}
          </button>
        </form>

        {error && (
          <p className='text-red-600 text-sm mb-2 text-center'>{error}</p>
        )}

        <ul className='space-y-3'>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className='flex items-center justify-between bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg shadow-sm'
            >
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={todo.completed}
                  onChange={() => handlecomplete(todo)}
                  className='h-4 w-4 cursor-pointer text-blue-600'
                />
                <span className='text-gray-800'>{todo.title}</span>
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={() => handleedit(todo)}
                  className='text-yellow-500 cursor-pointer hover:text-yellow-600 text-xl'
                >
                  ✏
                </button>
                <button
                  onClick={() => handledelete(todo.id)}
                  className='text-red-500 cursor-pointer hover:text-red-600 text-xl'
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className='text-center mt-6'>
          <button
            onClick={()=>navigate('/completed')}
            className='px-4 py-2 cursor-pointer bg-blue-900 rounded-lg text-white'
          >
            completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Function;