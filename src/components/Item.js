import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Item(props) {
  const item = props.name;
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item.item);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const nameStyles = {
    fontWeight: "bold",
    fontSize: "1.1em",
  };

  function handleDelete() {
    props.remove(item);
  }

  function handleEdit() {
    setIsEditing(true);
    props.setEditingItemId(item.id);
  }

  function handleSave() {
    setIsEditing(false);
    props.edit(item.id, editedItem);
  }

  function handleCancel() {
    setIsEditing(false);
    setEditedItem(item.item);
    props.setEditingItemId(null);
  }

  function handleStatusChange() {
    props.togglePlayed(item);
  }

  function handleInputChange(e) {
    setEditedItem(e.target.value);
  }

  return (
    <li className="item">
      <div className="item-details">
        <p>
          <span>
            <Checkbox
              {...label}
              type="checkbox"
              onChange={handleStatusChange}
              checked={item.played}
            />
            {item.played === true ? (
              <del style={nameStyles}>{item.item}</del>
            ) : (
              <span style={nameStyles}>{item.item}</span>
            )}
          </span>
        </p>
        <p>
          <span className="time">
            {item.startTime &&
              `Started at: ${item.startTime.toLocaleTimeString()}`}
            {"\u00A0\u00A0\u00A0"}
            {item.completedTime &&
              `Completed at: ${item.completedTime.toLocaleTimeString()}`}{" "}
          </span>
        </p>
      </div>
      <div className="buttons">
        {isEditing ? (
          <>
            <IconButton
              onClick={handleSave}
              aria-label="Save"
              style={{ color: "green" }}
            >
              <Tooltip title="Save">
                <SaveIcon />
              </Tooltip>
            </IconButton>
            <IconButton
              onClick={handleCancel}
              aria-label="Cancel"
              style={{ color: "red" }}
            >
              <Tooltip title="Cancel">
                <CancelIcon />
              </Tooltip>
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              onClick={() => handleEdit(item.id)}
              aria-label="Edit"
              style={{ color: "green" }}
            >
              <Tooltip title="Edit">
                <EditIcon />
              </Tooltip>
            </IconButton>
            <IconButton
              onClick={handleDelete}
              aria-label="Delete"
              style={{ color: "red" }}
            >
              <Tooltip title="Delete">
                <DeleteIcon />
              </Tooltip>
            </IconButton>
          </>
        )}
      </div>
    </li>
  );
}
