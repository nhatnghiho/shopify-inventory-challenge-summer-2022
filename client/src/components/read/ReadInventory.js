import { useState } from "react";
import axios from "axios";

function ReadInventory() {
  const [item_id, setItemID] = useState();
  const [location_id, setLocationID] = useState();
  const [feedback, setFeedback] = useState();

  async function getAvailability(e) {
    e.preventDefault();
    const url =
      "http://localhost:4000/api/inventory/get/availability?item_id=" +
      item_id +
      "&location_id=" +
      location_id;
    await axios.get(url).then((res) => {
      console.log(res.data);

      if (!res.data.item_exist || !res.data.location_exist) {
        setFeedback(
          <span>
            <div>
              {!res.data.item_exist ? `Item ID=${item_id} does not exist` : ""}
            </div>
            <div>
              {!res.data.location_exist
                ? `Location ID=${location_id} does not exist`
                : ""}
            </div>
          </span>
        );
      } else {
        setFeedback(
          <span>
            <div>
              Item {item_id} at Location {location_id}
            </div>
            <div>
              {res.data.inventory === null
                ? "This item is not sold at this location"
                : "Availability: " + res.data.inventory.item_count}
            </div>
          </span>
        );
      }
    });
    document.getElementById("get_availability").reset();
  }

  return (
    <div className="col-container">
      <div className="left-col">
        <h3>Show Item Availability at a Location</h3>
        <form id="get_availability" onSubmit={getAvailability}>
          <div className="form-row">
            <div className="label-col">
              <label> Item ID: </label>
            </div>
            <div className="input-col">
              <input type="text" onChange={(e) => setItemID(e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="label-col">
              <label>Location ID: </label>
            </div>
            <div className="input-col">
              <input
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

export default ReadInventory;
