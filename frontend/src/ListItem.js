import React, { useState } from 'react';
import DataService from './services/ItemService';

const ListItem = (props) => {
  const initialListItemState = {
    key: null,
    title: '',
    description: '',
    activeStatus: false,
  };
  const [currentListItem, setCurrentListItem] = useState(initialListItemState);
  const [message, setMessage] = useState('');

  const { listitem } = props;
  if (currentListItem.id !== listitem.id) {
    setCurrentListItem(listitem);
    setMessage('');
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentListItem({ ...currentListItem, [name]: value });
  };

  const updateActiveStatus = (status) => {
    DataService.update(currentListItem.id, { activeStatus: status })
      .then(() => {
        setCurrentListItem({ ...currentListItem, activeStatus: status });
        console.log(currentListItem);
        if (currentListItem.activeStatus === false) {
          setMessage('Updated status to active');
        } else if (currentListItem.activeStatus === true) {
          setMessage('Updated status to draft');
        } else {
          setMessage('Updated status to active');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateListItem = () => {
    const data = {
      title: currentListItem.title,
      description: currentListItem.description,
    };

    DataService.update(currentListItem.id, data)
      .then(() => {
        setMessage(currentListItem.title + ' was updated successfully!');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteListItem = () => {
    DataService.remove(currentListItem.id)
      .then(() => {
        props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentListItem ? (
        <div className='edit-form'>
          <h4>Edit Item</h4>
          <form>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                className='form-control'
                id='title'
                name='title'
                value={currentListItem.title}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <input
                type='text'
                className='form-control'
                id='description'
                name='description'
                value={currentListItem.description}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group'>
              <label>
                <strong>Status:&nbsp;</strong>
              </label>
              {currentListItem.activeStatus ? 'Active' : 'Draft'}
            </div>
          </form>

          {currentListItem.activeStatus ? (
            <button
              className='badge-primary mr-2 btn-e'
              onClick={() => updateActiveStatus(false)}
            >
              Draft
            </button>
          ) : (
            <button
              className='badge-primary mr-2 btn-e'
              onClick={() => updateActiveStatus(true)}
            >
              Active
            </button>
          )}

          <button className='badge-danger mr-2 btn-e' onClick={deleteListItem}>
            Delete
          </button>

          <button
            type='submit'
            className='badge-success btn-e'
            onClick={updateListItem}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <p>Please click on a Item...</p>
        </div>
      )}
    </div>
  );
};

export default ListItem;
