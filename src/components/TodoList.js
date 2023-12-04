import React, { useState } from "react";
import Form from "./Form";
import Item from "./Item";
import Button from "@mui/material/Button";

export default function TodoList() {
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  function addItem(item) {
    const updatedList = [...items, { ...item, startTime: new Date() }];
    setItems(updatedList);
    setIsAdding(false);
  }

  function removeItem(track) {
    const updatedList = items.filter(function (item) {
      return item.id !== track.id;
    });
    setItems(updatedList);
  }

  function togglePlayed(track) {
    const updatedItems = items.map(function (item) {
      if (item.id === track.id) {
        item.played = !item.played;
        if (item.played) {
          item.completedTime = new Date();
        } else {
          item.completedTime = null;
        }
      }
      return item;
    });

    setItems(updatedItems);
  }

  function editItem(itemId, editedText) {
    const updatedItems = items.map(function (item) {
      if (item.id === itemId) {
        item.item = editedText;
      }
      return item;
    });

    setItems(updatedItems);
  }

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingItemId(null);
  };

  const handleEditClick = (itemId) => {
    setIsAdding(true);
    setEditingItemId(itemId);
  };

  return (
    <div className="items-stack">
      {editingItemId === null && !isAdding && (
        <ul>
          {items.map((item) => (
            <Item
              key={item.id}
              name={item}
              remove={removeItem}
              togglePlayed={togglePlayed}
              setEditingItemId={handleEditClick}
              edit={editItem}
            />
          ))}
        </ul>
      )}

      {isAdding && (
        <Form
          addList={addItem}
          editingItemId={editingItemId}
          editItem={(itemId, editedText) => {
            editItem(itemId, editedText);
            setIsAdding(false);
            setEditingItemId(null);
          }}
          setEditingItemId={setEditingItemId}
          items={items}
        />
      )}

      {!isAdding && (
        <Button onClick={handleAddClick} variant="contained" color="success">
          Add TASK
        </Button>
      )}
    </div>
  );
}
