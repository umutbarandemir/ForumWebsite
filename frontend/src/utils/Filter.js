import React from "react"

const capitalize = str =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

 const Filter = ({ title, isActive, onClick }) => {
  return (
    <div
      className="wrapper"
      onClick={onClick}
      style={{ backgroundColor: `${isActive ? "lavender" : "white"}` }}
    >
      <div
        className="circle"
        style={{
          borderColor: `${
            title === "movie"
              ? "gold"
              : title === "music"
              ? "tomato"
              : "limegreen"
          }`
        }}
      ></div>
      <h3 className="title">{capitalize(title)}</h3>
    </div>
  )
}

export default Filter;