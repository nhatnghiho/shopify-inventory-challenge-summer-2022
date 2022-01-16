import DeleteItem from "./DeleteItem";
import DeleteLocation from "./DeleteLocation";
import DeleteInventory from "./DeleteInventory";

function Delete() {
  return (
    <div>
      <h2>Delete Section</h2>
      <DeleteItem />
      <DeleteLocation />
      <DeleteInventory />
    </div>
  );
}

export default Delete;
