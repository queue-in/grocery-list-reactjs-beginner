import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

const PinItem = ({ id, list, setList }) => {
  const [isPinned, setIsPinned] = useState(false);

  const handlePin = () => {
    // Toggle the pinned state for the item
    setIsPinned(!isPinned);
    
    // Move the item with the given id to the top of the list if pinned
    if (!isPinned) {
      setList((prevList) => {
        const itemToPin = prevList.find((el) => el.id === id);
        const otherItems = prevList.filter((el) => el.id !== id);
        return [itemToPin, ...otherItems]; // Prepend the pinned item to the list
      });
    } else {
      // If unpinned, simply move the item back to its original position
      setList((prevList) => {
        const itemToUnpin = prevList.find((el) => el.id === id);
        const otherItems = prevList.filter((el) => el.id !== id);
        return [...otherItems, itemToUnpin]; // Append the unpinned item to the list
      });
    }
  };

  return (
    <FontAwesomeIcon
      icon={faThumbtack}
      style={{
        cursor: 'pointer',
        color: isPinned ? 'green' : 'grey', // Change color based on pin state
      }}
      onClick={handlePin}
      title={isPinned ? 'Unpin item' : 'Pin item'}
    />
  );
};

export default PinItem;
