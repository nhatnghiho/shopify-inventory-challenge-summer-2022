import { useState } from "react";
import axios from "axios";

function CreateInventory() {
  const [inventory, setInventory] = useState({});
  const [feedback, setFeedback] = useState();

  async function createInventory(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/api/inventory/create", inventory)
      .then((res) => {
        if (!res.data.item_exist || !res.data.location_exist) {
          setFeedback(
            <span>
              <div>
                {!res.data.item_exist
                  ? "Item not found. Please register the item to the product catalog."
                  : ""}
              </div>
              <div>
                {!res.data.location_exist
                  ? "Location not found. Please create a new location."
                  : ""}
              </div>
            </span>
          );
        } else {
          setFeedback(
            <span>
              <div>
                {res.data.inventory_exist
                  ? "This item has been registered at this location. Please udpate availability below."
                  : `Item with ID = ${inventory.item_id} registered successfully at location with ID = ${inventory.location_id}.`}
              </div>
            </span>
          );
        }
      });

    document.getElementById("create_inventory").reset();
  }

  return (
    <div className="col-container">
      <div className="left-col">
        <h3> Register Item To Location</h3>
        <form id="create_inventory" onSubmit={createInventory}>
          <div className="form-row">
            <div className="label-col">
              <label> Item ID: </label>
            </div>
            <div className="input-col">
              <input
                required
                type="text"
                onChange={(e) =>
                  setInventory({ ...inventory, item_id: e.target.value })
                }
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
                onChange={(e) =>
                  setInventory({ ...inventory, location_id: e.target.value })
                }
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
        <div>{feedback}</div>
      </div>
    </div>
  );
}

export default CreateInventory;
