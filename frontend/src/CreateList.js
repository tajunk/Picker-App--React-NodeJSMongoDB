import React, { useState } from 'react';
import './App.css';

// OLD VERSION

const CreateList = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && url) {
      const listItem = {
        id: new Date().getTime().toString(),
        title,
        description,
        url,
      };
      console.log(listItem);
      setList((list) => {
        return [...list, listItem];
      });
      setTitle('');
      setDescription('');
      setUrl('');
    } else {
      console.log('Empty Values');
    }
  };

  return (
    <article>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='title'>Name : </label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='description'>Description : </label>
          <input
            type='text'
            name='description'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='url'>URL : </label>
          <input
            type='text'
            name='url'
            id='url'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type='submit'>Add</button>
      </form>
      {list.map((listItem) => {
        const { id, title, description, url } = listItem;
        return (
          <div className='item' key={id}>
            <h4>{title}</h4>
            <p>{description}</p>
            <p>{url}</p>
          </div>
        );
      })}
    </article>
  );
};

export default CreateList;
