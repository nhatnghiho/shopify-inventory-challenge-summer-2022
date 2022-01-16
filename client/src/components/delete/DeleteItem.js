import { useState } from "react";
import axios from "axios";

function DeleteItem() {
  const [item_id, setItemID] = useState();
  const [feedback, setFeedback] = useState();

  async function deleteItem(e) {
    e.preventDefault();
    const url = "http://localhost:4000/api/items/delete?item_id=" + item_id;
    await axios.post(url).then((res) => {
      setFeedback(
        <span>
          <div>
            {!res.data.item_exist
              ? `Item ID = ${item_id} not found`
              : `Deleted item with ID=${item_id}`}
          </div>
        </span>
      );
    });

    document.getElementById("delete_item").reset();
  }

  return (
    <div className="col-container">
      <div className="left-col">
        <h3>Delete Item</h3>
        <form id="delete_item" onSubmit={deleteItem}>
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

export default DeleteItem;
