import UpdateItem from "./UpdateItem";
import UpdateLocation from "./UpdateLocation";
import UpdateInventory from "./UpdateInventory";

function Update() {
  return (
    <div>
      <h2>Update Section</h2>
      <UpdateItem />
      <UpdateLocation />
      <UpdateInventory />
    </div>
  );
}

export default Update;
