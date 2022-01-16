import "./App.css";
import Create from "./components/create/Create";
import Read from "./components/read/Read";
import Update from "./components/update/Update";
import Delete from "./components/delete/Delete";

function App() {
  // test comment for Github
  return (
    <div className="App">
      <Create />
      <Read />
      <Update />
      <Delete />
    </div>
  );
}

export default App;
