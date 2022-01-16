import { useState } from "react";
import axios from "axios";

function CreateItem() {
  const [item, setItem] = useState({});
  const [feedback, setFeedback] = useState();

  async function createItem(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/api/items/create", item)
      .then((res) => {
        setFeedback(
          <div>
            {res.data.item_exist
              ? `Item ID ${item.item_id} is used. Please use another ID.`
              : `New item (ID: ${res.data.item.item_id}, Name: ${res.data.item.item_name}) is added to catalog.`}
          </div>
        );
        document.getElementById("create_item").reset();
      });
  }

  return (
    <div className="col-container">
      <div className="left-col">
        <h3>Register New Item To Product Catalog</h3>
        <form id="create_item" onSubmit={createItem}>
          <div className="form-row">
            <div className="label-col">
              <label>Item ID: </label>
            </div>
            <div className="input-col">
              <input
                required
                type="text"
                onChange={(e) => setItem({ ...item, item_id: e.target.value })}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="label-col">
              <label> Item Name: </label>
            </div>
            <div className="input-col">
              <input
                required
                type="text"
                onChange={(e) =>
                  setItem({ ...item, item_name: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="label-col">
              <label> SKU: </label>
            </div>
            <div className="input-col">
              <input
                required
                type="text"
                onChange={(e) => setItem({ ...item, sku: e.target.value })}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="label-col">
              <label> Cost: </label>
            </div>
            <div className="input-col">
              <input
                required
                type="number"
                min="0.00"
                step="0.01"
                onChange={(e) => setItem({ ...item, cost: e.target.value })}
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

export default CreateItem;
