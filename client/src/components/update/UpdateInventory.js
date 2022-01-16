import { useState } from "react";
import axios from "axios";

function UpdateInventory() {
  const [inventory, setInventory] = useState({});
  const [feedback, setFeedback] = useState();

  async function setAvailability(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/inventory/set/availability", inventory)
      .then((res) => {
        console.log(res.data);
        if (!res.data.item_exist || !res.data.location_exist) {
          setFeedback(
            <span>
              <div>
                {!res.data.item_exist
                  ? `Item ID ${inventory.item_id} does not exist. Please double check or register a new item.`
                  : ""}
              </div>
              <div>
                {!res.data.location_exist
                  ? `Location ID ${inventory.location_id} does not exist. Please double check or register a new location.`
                  : ""}
              </div>
            </span>
          );
        } else {
          setFeedback(
            <div>
              {res.data.inventory_exist
                ? `Set Inventory: Item ID=${inventory.item_id}, Location ID=${inventory.location_id}, New Availabiity: ${res.data.updatedInventory.item_count}.`
                : `Item with ID = ${inventory.item_id} not registered at store ID = ${inventory.location_id}.`}
            </div>
          );
        }
      });
    document.getElementById("set_availability").reset();
  }

  async function adjustAvailabiltiy(e) {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/api/inventory/adjust/availability",
        inventory
      )
      .then((res) => {
        if (!res.data.item_exist || !res.data.location_exist) {
          setFeedback(
            <span>
              <div>
                {!res.data.item_exist
                  ? `Item ID = ${inventory.item_id} does not exist. Please double check the item ID or register a new item.`
                  : ""}
              </div>
              <div>
                {!res.data.location_exist
                  ? `Location ID = ${inventory.location_id} does not exist. Please double check the location ID or create a new location.`
                  : ""}
              </div>
            </span>
          );
        } else {
          console.log(res.data);
          setFeedback(
            <span>
              <div>
                {!res.data.inventory_exist
                  ? `Item with ID = ${inventory.item_id} not registered at store ID = ${inventory.location_id}.`
                  : !res.data.adjust_exceeded
                  ? `Adjusted Inventory: Item ID=${inventory.item_id}, Location ID=${inventory.location_id}, New Availabiity: ${res.data.updatedInventory.item_count}.`
                  : `Adjust quantity of ${inventory.adjustment} exceeds available quantity of ${res.data.old_item_count}.`}
              </div>
            </span>
          );
        }
      });
    document.getElementById("adjust_availability").reset();
  }

  return (
    <div className="col-container">
      <div className="left-col">
        <h3>Set inventory</h3>
        <form id="set_availability" onSubmit={setAvailability}>
          <div className="form-row">
            <div className="label-col">
              <label>Item ID:</label>
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
              <label>Location ID:</label>
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
            <div className="label-col">
              <label>Item Count:</label>
            </div>
            <div className="input-col">
              <input
                required
                type="number"
                min="0"
                onChange={(e) =>
                  setInventory({ ...inventory, item_count: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <input type="submit" value="Submit" />
          </div>
        </form>
        <h3>Adjust inventory</h3>
        <form id="adjust_availability" onSubmit={adjustAvailabiltiy}>
          <div className="form-row">
            <div className="label-col">
              <label>Item ID:</label>
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
              <label>Location ID:</label>
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
            <div className="label-col">
              <label>Adjust Quantity: </label>
            </div>
            <div className="input-col">
              <input
                required
                type="number"
                onChange={(e) =>
                  setInventory({ ...inventory, adjustment: e.target.value })
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
        {feedback}
      </div>
    </div>
  );
}

export default UpdateInventory;
