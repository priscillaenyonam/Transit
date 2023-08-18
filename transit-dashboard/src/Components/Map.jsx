import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

const MapWithMarkers = ({ riders }) => {
  const fitMarkersToBounds = (map, markers) => {
    if (markers.length === 0) return;

    const bounds = L.latLngBounds();

    markers.forEach((marker) => {
      const { lat, lon } = marker.Location_Lat_Lon;
      bounds.extend([lat, lon]);
    });

    map.fitBounds(bounds);
  };

  const MapWrapper = () => {
    const map = useMap();

    useEffect(() => {
      fitMarkersToBounds(map, riders);
    }, [map, riders]);

    return null;
  };

  return riders ? (
    <div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          height: "25rem",
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0 0 5px 5px rgba(12, 12, 50, 0.2) ",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapWrapper />

        {riders?.map((eachrider) => {
          return (
            <Marker
              key={Math.random(2)}
              position={[
                eachrider.Location_Lat_Lon.lat,
                eachrider.Location_Lat_Lon.lon,
              ]}
            >
              <Popup>{eachrider.phone}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  ) : (
    <div className="d-flex justify-content-center h-100">
      <div class="spinner-border text-primary " role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default MapWithMarkers;
