"use client";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function FraudMap({ filter }) {
  // Example static data
  const incidents = [
    { id: 1, lat: 40.7128, lng: -74.006, country: "USA", severity: "High" },
    { id: 2, lat: 51.5074, lng: -0.1278, country: "UK", severity: "Medium" },
  ];

  return (
    <MapContainer center={[20, 0]} zoom={2} className="w-full h-full rounded-xl shadow-lg">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {incidents.map((i) => (
        <CircleMarker
          key={i.id}
          center={[i.lat, i.lng]}
          radius={i.severity === "High" ? 12 : 8}
          color={i.severity === "High" ? "red" : "orange"}
        >
          <Popup>
            {i.country} - {i.severity} Severity
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
