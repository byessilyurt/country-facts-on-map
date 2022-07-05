// components
import Map from "./components/Map";

function App() {
  const center = { lat: 35.397, lng: 37.644 };
  const zoom = 2;

  return (
    <div className="App">
      <div>
        <Map> markers here </Map>
      </div>
    </div>
  );
}

export default App;
