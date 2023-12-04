// Form.js
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
          played: false,
        };
        props.addList(newItem);
        setItem("");
      }
    }
  }

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          onChange={handleItemChange}
          value={item}
          placeholder="Add new task..."
        />
        <Button type="submit" variant="contained" color="success">
          Add
        </Button>
      </form>
    </div>
  );
}
