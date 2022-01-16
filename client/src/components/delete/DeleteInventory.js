import { useState } from "react";
import axios from "axios";

function DeleteInventory() {
  const [item_id, setItemID] = useState();
  const [location_id, setLocationID] = useState();
  const [feedback, setFeedback] = useState();

  async function deleteInventory(e) {
    e.preventDefault();
    const url =
      "http://localhost:4000/api/inventory/delete?item_id=" +
      item_id +
      "&location_id=" +
      location_id;
    await axios.post(url).then((res) => {
      if (!res.data.item_exist || !res.data.location_exist) {
        setFeedback(
          <span>
            <div>
              {!res.data.item_exist ? `Item ID = ${item_id} not found` : ""}
            </div>
            <div>
              {!res.data.location_exist
                ? `Location ID = ${location_id} not found`
                : ""}
            </div>
          </span>
        );
      } else {
        setFeedback(
          <span>
            <div>
              {res.data.inventory_exist
                ? `Item with ID = ${item_id} is not registered at store ID = ${location_id}. Please double-check your inputs`
                : `Item with ID = ${item_id} removed from store ID = ${location_id}.`}
            </div>
          </span>
        );
      }
    });

    document.getElementById("delete_inventory").reset();
  }
  return (
    <div className="col-container">
      <div className="left-col">
        <h3>Delete Item at a Location</h3>
        <form id="delete_inventory" onSubmit={deleteInventory}>
          <div className="form-row">
            <div className="label-col">
              <label> Item ID: </label>
            </div>
            <div className="input-col">
              <input
                required
                type="text"
                onChange={(e) => setItemID(e.target.value)}
              />
            </div>
          </div>
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

export default DeleteInventory;
