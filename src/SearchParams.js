import React, { useState } from "react";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  // const location = "Seattle, WA";

  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form action="">
        <label htmlFor="location">
          Location
          <input
            id="location"
            onChange={e => setLocation(e.target.value)}
            value={location}
            placeholder="Location"
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
