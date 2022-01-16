import CreateItem from "./CreateItem";
import CreateLocation from "./CreateLocation";
import CreateInventory from "./CreateInventory";

function Create() {
  return (
    <div>
      <h2>Create Section</h2>
      <CreateItem />
      <CreateLocation />
      <CreateInventory />
    </div>
  );
}

export default Create;
