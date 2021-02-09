import React from "react";
import "../app.css";

export default function Cityform(props) {
  return (
    <div className="form">
      <form className="city-form" onSubmit={props.getUser}>
        <input type="text" name="city" placeholder="Enter City Name" required />
        <button>
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </form>
    </div>
  );
}
