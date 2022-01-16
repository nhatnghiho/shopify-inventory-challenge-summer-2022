import { useState } from "react";
import axios from "axios";

function UpdateItem() {
  const [item, setItem] = useState({});

  const [feedback, setFeedback] = useState();

  async function updateItem(e) {
    e.preventDefault();
    const url = "http://localhost:4000/api/items/modify/" + item.item_id;
    console.log("before axios: ", item);
    axios.post(url, item).then((res) => {
      setFeedback(
        <span>
          <div>
            {!res.data.item_exist
              ? `Item ID ${item.item_id} does not exist.`
              : `Updated item with ID=${item.item_id} successfully.`}
          </div>
        </span>
      );
    });
    document.getElementById("update_item").reset();
  }

  console.log(item);

  return (
    <div className="col-container">
      <div className="left-col">
        <h3>Update item</h3>
        <form id="update_item" onSubmit={updateItem}>
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
        {feedback}
      </div>
    </div>
  );
}

export default UpdateItem;
