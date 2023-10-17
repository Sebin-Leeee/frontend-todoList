import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function Form(props) {
  const [item, setItem] = useState("");
  const isEditing = props.editingItemId !== null;

  useEffect(() => {
    if (isEditing) {
      const editedItem = props.items.find((i) => i.id === props.editingItemId);
      setItem(editedItem ? editedItem.item : "");
    }
  }, [props.editingItemId, props.items]);

  function handleItemChange(e) {
    setItem(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isEditing) {
      props.editItem(props.editingItemId, item);
      setItem("");
      props.setEditingItemId(null);
    } else {
      if (item) {
        const newItem = {
          item: item,
          id: nanoid(),
          played: false
        };
        props.addList(newItem);
        setItem("");
      }
    }
  }

  return (
    <div className="edit">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Add new task..."
            onChange={handleItemChange}
            value={item}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
