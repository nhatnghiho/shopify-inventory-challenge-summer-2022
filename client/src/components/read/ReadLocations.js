import { useState } from "react";
import axios from "axios";

function ReadLocations() {
  const [item_id, setItemID] = useState();
  const [location_id, setLocationID] = useState();
  const [feedback, setFeedback] = useState();

  async function getAllLocations(e) {
    e.preventDefault();
    await axios
      .get("http://localhost:4000/api/locations/get/all")
      .then((res) => {
        var locations;

        if (res.data.locations.length === 0) {
          locations = <div>No locations exist yet</div>;
        } else {
          var header = (
            <tr>
              <th>Location ID</th>
              <th>Location Name</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Zip</th>
            </tr>
          );
          locations = res.data.locations.map((location) => (
            <tr>
              <td key={"1-" + location.location_id}>{location.location_id}</td>
              <td key={"2-" + location.location_name}>
                {location.location_name}
              </td>
              <td key={"3-" + location.address}>{location.address}</td>
              <td key={"3-" + location._id}>{location.city}</td>
              <td key={"4-" + location.state}>{location.state}</td>
              <td key={"5-" + location.country}>{location.country}</td>
              <td key={"6-" + location.zip}>{location.zip}</td>
            </tr>
          ));
        }
        setFeedback(
          <table>
            {header}
            {locations}
          </table>
        );
      });
    document.getElementById("get_all_locations").reset();
  }

  async function getLocationAttributes(e) {
    e.preventDefault();
    const url =
      "http://localhost:4000/api/locations/get/attributes?location_id=" +
      location_id;
    await axios.get(url).then((res) => {
      console.log(res.data);
      if (!res.data.location_exist) {
        let feedback = `Location ID ${location_id} does not exist.`;
        setFeedback(<div>{feedback}</div>);
      } else {
        console.log(res.data.location);
        var header = (
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        );
        const attributes = Object.keys(res.data.location).map((field) => (
          <tr>
            <td key={field}>{field}</td>
            <td key={res.data.location[field]}>{res.data.location[field]}</td>
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
    document.getElementById("get_location_attributes").reset();
  }

  async function getLocationsOfItem(e) {
    e.preventDefault();
    const url = "http://localhost:4000/api/locations/get?item_id=" + item_id;
    await axios.get(url).then((res) => {
      console.log("res: ", res.data);
      if (!res.data.item_exist) {
        setFeedback(
          <span>
            <div>This item does not exist</div>
          </span>
        );
      } else {
        if (res.data.locations.length === 0) {
          setFeedback(
            <span>
              <div>This item is not available at any location yet.</div>
            </span>
          );
        } else {
          var header = (
            <tr>
              <th>Location ID</th>
              <th>Location Name</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Zip</th>
            </tr>
          );
          var locations = res.data.locations.map((location) => (
            <tr>
              <td>{location.location_id}</td>
              <td>{location.location_name}</td>
              <td>{location.address}</td>
              <td>{location.city}</td>
              <td>{location.state}</td>
              <td>{location.country}</td>
              <td>{location.zip}</td>
            </tr>
          ));
          setFeedback(
            <div>
              <div>Locations of Item ID {res.data.item_id}</div>
              <table>
                {header}
                {locations}
              </table>
            </div>
          );
        }
      }
    });
    document.getElementById("get_locations_of_item").reset();
  }

  return (
    <div className="col-container">
      <div className="left-col">
        <h3>List All Locations In Network</h3>
        <form id="get_all_locations" onSubmit={getAllLocations}>
          <button>Show All Locations</button>
        </form>

        <h3>List All Locations That Offer An Item</h3>
        <form id="get_locations_of_item" onSubmit={getLocationsOfItem}>
          <div className="form-row">
            <div className="label-col">
              <label> Item ID: </label>
            </div>
            <div className="input-col">
              <input type="text" onChange={(e) => setItemID(e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <input type="submit" value="Submit" />
          </div>
        </form>

        <h3>Display All Attributes Of A Location</h3>
        <form id="get_location_attributes" onSubmit={getLocationAttributes}>
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

export default ReadLocations;
