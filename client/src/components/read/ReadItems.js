import { useState } from "react";
import axios from "axios";

function ReadItems() {
  const [item_id, setItemID] = useState();
  const [location_id, setLocationID] = useState();
  const [feedback, setFeedback] = useState();

  async function getAllItems(e) {
    e.preventDefault();
    await axios.get("http://localhost:4000/api/items/get/all").then((res) => {
      var items;
      if (res.data.items.length === 0) {
        items = <div>No items exist yet</div>;
      } else {
        var header = (
          <tr>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>SKU</th>
            <th>Cost</th>
          </tr>
        );
        items = res.data.items.map((item) => (
          <tr>
            <td>{item.item_id}</td>
            <td>{item.item_name}</td>
            <td>{item.sku}</td>
            <td>{item.cost}</td>
          </tr>
        ));
      }
      setFeedback(
        <table>
          {header}
          {items}
        </table>
      );
    });
    document.getElementById("get_all_items").reset();
  }

  async function getItemsAtLocation(e) {
    e.preventDefault();
    const url =
      "http://localhost:4000/api/items/get?location_id=" + location_id;
    await axios.get(url).then((res) => {
      if (!res.data.location_exist) {
        setFeedback(
          <div>
            {!res.data.location_exist ? "This location does not exist." : ""}
          </div>
        );
      } else {
        if (res.data.items.length === 0) {
          setFeedback(<div>No items at this location.</div>);
        } else {
          var header = (
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>SKU</th>
              <th>Cost</th>
            </tr>
          );
          var items = res.data.items.map((item) => (
            <tr>
              <td>{item.item_id}</td>
              <td>{item.item_name}</td>
              <td>{item.sku}</td>
              <td>{item.cost}</td>
            </tr>
          ));
          setFeedback(
            <div>
              <div>Items at Location ID {res.data.location_id}</div>
              <table>
                {header}
                {items}
              </table>
            </div>
          );
        }
      }
    });
    document.getElementById("get_items_at_location").reset();
  }

  async function getItemAttributes(e) {
    e.preventDefault();
    const url =
      "http://localhost:4000/api/items/get/attributes?item_id=" + item_id;
    await axios.get(url).then((res) => {
      console.log("res.data.item: ", res.data.item);
      if (!res.data.item_exist) {
        setFeedback(<span>Item ID does not exist</span>);
      } else {
        console.log(Object.keys(res.data.item));
        var header = (
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        );
        const attributes = Object.keys(res.data.item).map((field) => (
          <tr>
            <td key={field}>{field}</td>
            <td key={res.data.item[field]}>{res.data.item[field]}</td>
          </tr>
        ));

        setFeedback(
          <table>
            {header}
            {attributes}
          </table>
        );
      }
    });
    document.getElementById("get_item_properties").reset();
  }

  return (
    <div className="col-container">
      <div className="left-col">
        <h3>List All Items In Catalog</h3>
        <form id="get_all_items" onSubmit={getAllItems}>
          <button>Show Product Catalog</button>
        </form>

        <h3>List All Items At A Location</h3>
        <form id="get_items_at_location" onSubmit={getItemsAtLocation}>
          <div className="form-row">
            <div className="label-col">
              <label>Location ID:</label>
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

        <h3>Display All Attributes Of An Item</h3>
        <form id="get_item_properties" onSubmit={getItemAttributes}>
          <div className="form-row">
            <div className="label-col">
              <label>Item ID: </label>
            </div>
            <div className="input-col">
              <input type="text" onChange={(e) => setItemID(e.target.value)} />
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

export default ReadItems;
