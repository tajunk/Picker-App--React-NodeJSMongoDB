import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import DataService from './services/ItemService';
import ListItem from './ListItem';

const ItemsList = () => {
  const [currentListItem, setCurrentListItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const [listitems, loading, error] = useCollection(
    DataService.getAll().orderBy('title', 'asc')
  );

  const refreshList = () => {
    setCurrentListItem(null);
    setCurrentIndex(-1);
  };

  const setActiveListItem = (listitem, index) => {
    const { title, description, published } = listitem.data();

    setCurrentListItem({
      id: listitem.id,
      title,
      description,
      published,
    });

    setCurrentIndex(index);
  };

  return (
    <div className='list row'>
      <div className='col-md-6 mobileS'>
        <h4>Items List</h4>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Loading...</span>}
        <ul className='list-group pointer'>
          {!loading &&
            listitems &&
            listitems.docs.map((listitem, index) => (
              <li
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActiveListItem(listitem, index)}
                key={listitem.id}
              >
                {listitem.data().title}
              </li>
            ))}
        </ul>
      </div>

      <div className='col-md-6'>
        {currentListItem ? (
          <ListItem listitem={currentListItem} refreshList={refreshList} />
        ) : (
          <div>
            <br />
            <p>Click on an item to edit it here</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ItemsList;
