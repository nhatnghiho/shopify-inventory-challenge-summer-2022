import ReadItems from "./ReadItems";
import ReadLocations from "./ReadLocations";
import ReadInventory from "./ReadInventory";

function Read() {
  return (
    <div>
      <h2>Read Section</h2>
      <ReadItems />
      <ReadLocations />
      <ReadInventory />
    </div>
  );
}

export default Read;
