"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function FraudMap({ filter }) {
  // Example static data
  const incidents = [
    { id: 1, lat: 40.7128, lng: -74.006, country: "USA", severity: "High" },
    { id: 2, lat: 51.5074, lng: -0.1278, country: "UK", severity: "Medium" },
    { id: 3, lat: 48.8566, lng: 2.3522, country: "France", severity: "Low" },
    { id: 4, lat: 52.52, lng: 13.405, country: "Germany", severity: "High" },
  ];

  // Apply filter
  const filteredIncidents = incidents.filter((i) => {
    const severityMatch =
      filter.severity === "All" || i.severity === filter.severity;
    const countryMatch =
      filter.country === "All" || i.country === filter.country;
    return severityMatch && countryMatch;
  });

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      className="w-full h-full rounded-xl shadow-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {filteredIncidents.map((i) => (
        <CircleMarker
          key={i.id}
          center={[i.lat, i.lng]}
          radius={i.severity === "High" ? 12 : i.severity === "Medium" ? 8 : 5}
          color={
            i.severity === "High"
              ? "red"
              : i.severity === "Medium"
              ? "orange"
              : "yellow"
          }
        >
          <Popup>
            {i.country} - {i.severity} Severity
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
