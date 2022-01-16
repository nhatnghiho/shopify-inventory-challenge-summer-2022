import { useState } from "react";
import axios from "axios";

function CreateLocation() {
  const [location, setLocation] = useState({});
  const [feedback, setFeedback] = useState();

  async function createLocation(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/api/locations/create", location)
      .then((res) => {
        setFeedback(
          <span>
            <div>
              {res.data.location_exist
                ? "This store ID has been used"
                : `New store (ID: ${res.data.location.location_id}, Name: ${res.data.location.location_name}) has been created.`}
            </div>
          </span>
        );
      });
    document.getElementById("create_location").reset();
  }

  return (
    <div className="col-container">
      <div className="left-col">
        <h3> Create New Store Location</h3>
        <form id="create_location" onSubmit={createLocation}>
          <div className="form-row">
            <div className="label-col">
              <label>Location ID:</label>
            </div>
            <div className="input-col">
              <input
                required
                type="text"
                onChange={(e) =>
                  setLocation({ ...location, location_id: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="label-col">
              <label>Location Name:</label>
            </div>
            <div className="input-col">
              <input
                required
                type="text"
                onChange={(e) =>
                  setLocation({ ...location, location_name: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="label-col">
              <label>Address:</label>
            </div>
            <div className="input-col">
              <input
                required
                type="text"
                onChange={(e) =>
                  setLocation({ ...location, address: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="label-col">
              <label>City:</label>
            </div>
            <div className="input-col">
              <input
                required
                type="text"
                onChange={(e) =>
                  setLocation({ ...location, city: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="label-col">
              <label>State:</label>
            </div>
            <div className="input-col">
              <input
                required
                type="text"
                onChange={(e) =>
                  setLocation({ ...location, state: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="label-col">
              <label>Country:</label>
            </div>
            <div className="input-col">
              <input
                required
                type="text"
                onChange={(e) =>
                  setLocation({ ...location, country: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="label-col">
              <label>Zip Code:</label>
            </div>
            <div className="input-col">
              <input
                required
                type="text"
                onChange={(e) =>
                  setLocation({ ...location, zip: e.target.value })
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

export default CreateLocation;
