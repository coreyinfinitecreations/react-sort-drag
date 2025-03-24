import React, { useState } from "react";

export const ReactSortDrag = ({ items: initialItems, onSortEnd }) => {
  const [items, setItems] = useState(initialItems);
  const [draggingIndex, setDraggingIndex] = useState(null);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index.toString());
    setDraggingIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === index) return;

    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggingIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setItems(newItems);
    setDraggingIndex(index);
  };

  const handleDrop = () => {
    setDraggingIndex(null);
    if (onSortEnd) onSortEnd(items);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={handleDrop}
          style={{
            padding: "16px",
            backgroundColor: "#ffffff",
            border: "1px solid #ddd",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            cursor: "move",
            opacity: draggingIndex === index ? 0.6 : 1,
            transition: "opacity 0.2s ease",
          }}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
};
