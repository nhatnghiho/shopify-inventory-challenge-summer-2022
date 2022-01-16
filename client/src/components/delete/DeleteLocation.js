import { useState } from "react";
import axios from "axios";

function DeleteLocation() {
  const [location_id, setLocationID] = useState();
  const [feedback, setFeedback] = useState();

  async function deleteLocation(e) {
    e.preventDefault();
    const url =
      "http://localhost:4000/api/locations/delete?location_id=" + location_id;
    await axios.post(url).then((res) => {
      // console.log("res ", res.data);

      setFeedback(
        <span>
          <div>
            {!res.data.location_exist
              ? `Location ID = ${location_id} not found`
              : `Deleted location with ID=${location_id} successfully.`}
          </div>
        </span>
      );
    });

    document.getElementById("delete_location").reset();
  }

  return (
    <div className="col-container">
      <div className="left-col">
        <h3>Delete Location</h3>
        <form id="delete_location" onSubmit={deleteLocation}>
          <div className="form-row">
            <div className="label-col">
              <label> Location ID: </label>
            </div>
            <div className="input-col">
              <input
                required
                type="text"
                onChange={(e) => setLocationID(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
      <div className="right-col">
        <h3>Output</h3>
        {feedback}
      </div>
    </div>
  );
}

export default DeleteLocation;
