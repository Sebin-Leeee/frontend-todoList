import React, { useState } from "react";
import Form from "./Form";
import Item from "./Item";

export default function TodoList() {
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  function addItem(item) {
    const updatedList = [...items, item];
    setItems(updatedList);
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
    setEditingItemId(null);
  }

  return (
    <div>
      <h1>Task Management App</h1>
      {editingItemId === null ? (
        <ul>
          {items.map((item) => (
            <Item
              key={item.id}
              name={item}
              remove={removeItem}
              togglePlayed={togglePlayed}
              setEditingItemId={setEditingItemId}
              edit={editItem}
            />
          ))}
        </ul>
      ) : null}

      <Form
        addList={addItem}
        editingItemId={editingItemId}
        editItem={editItem}
        setEditingItemId={setEditingItemId}
        items={items}
      />
    </div>
  );
}
