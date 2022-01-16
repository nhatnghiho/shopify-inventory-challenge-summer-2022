import { useState } from "react";
import axios from "axios";

function UpdateLocation() {
  const [location, setLocation] = useState({});

  const [feedback, setFeedback] = useState();

  async function updateLocation(e) {
    e.preventDefault();
    const url =
      "http://localhost:4000/api/locations/modify/" + location.location_id;
    axios.post(url, location).then((res) => {
      setFeedback(
        <span>
          <div>
            {!res.data.location_exist
              ? `Location ID ${location.location_id} does not exist.`
              : `Updated location with ID=${location.location_id} successfully.`}
          </div>
        </span>
      );
    });
    document.getElementById("update_location").reset();
  }

  return (
    <div className="col-container">
      <div className="left-col">
        <h3>Update Location</h3>
        <form id="update_location" onSubmit={updateLocation}>
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
                type="text"
                onChange={(e) =>
                  setLocation({ ...location, location_name: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="label-col">
              <label> Address: </label>
            </div>
            <div className="input-col">
              <input
                type="text"
                onChange={(e) =>
                  setLocation({ ...location, address: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="label-col">
              <label> City: </label>
            </div>
            <div className="input-col">
              <input
                type="text"
                onChange={(e) =>
                  setLocation({ ...location, city: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="label-col">
              <label> State: </label>
            </div>
            <div className="input-col">
              <input
                type="text"
                onChange={(e) =>
                  setLocation({ ...location, state: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="label-col">
              <label> Country: </label>
            </div>
            <div className="input-col">
              <input
                type="text"
                onChange={(e) =>
                  setLocation({ ...location, country: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="label-col">
              <label> Zip: </label>
            </div>
            <div className="input-col">
              <input
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
        {feedback}
      </div>
    </div>
  );
}

export default UpdateLocation;
