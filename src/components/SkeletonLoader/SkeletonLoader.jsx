// ...existing code...
import React from "react";
import "./SkeletonLoader.scss";

const SkeletonLoader = ({ count = 1, height = 20, width ='', circle = false, style = {} }) => {
  const items = Array.from({ length: count });
  return (
    <div className="skeleton-container" style={style}>
      {items.map((_, i) => (
        <div
          key={i}
          className={`skeleton ${circle ? "skeleton-circle" : ""}`}
          style={{ height: circle ? height : height ,width: circle ? height : width, ...style }}
        />
      ))}
    </div>
  );
};

export default SkeletonLoader;
// ...existing code...