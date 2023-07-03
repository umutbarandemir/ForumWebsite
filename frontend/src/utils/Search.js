import React from "react"

const Search = ({ onChange }) => {
  return (
    <div className='search-div'>
      <input
        className="search"
        type="text"
        onChange={onChange}
        placeholder="Search by the title ..."
      />
    </div>
  )
}

export default Search;