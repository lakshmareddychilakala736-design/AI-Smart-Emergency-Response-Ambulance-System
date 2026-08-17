import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

interface EmergencyMapProps {
  patientPos?: [number, number];
  ambulancePos?: [number, number];
  hospitalPos?: [number, number];
  height?: string;
}

// Custom Leaflet Icons with high-visibility emergency colors
const patientIcon = L.divIcon({
  className: 'custom-patient-marker',
  html: `<div style="background-color: #ef4444; width: 24px; height: 24px; borderRadius: 50%; border: 3px solid white; box-shadow: 0 0 15px rgba(239,68,68,0.8); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 11px;">P</div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const ambulanceIcon = L.divIcon({
  className: 'custom-ambulance-marker',
  html: `<div style="background-color: #3b82f6; width: 30px; height: 30px; borderRadius: 8px; border: 2px solid white; box-shadow: 0 0 20px rgba(59,130,246,0.9); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">🚑</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

const hospitalIcon = L.divIcon({
  className: 'custom-hospital-marker',
  html: `<div style="background-color: #10b981; width: 30px; height: 30px; borderRadius: 8px; border: 2px solid white; box-shadow: 0 0 20px rgba(16,185,129,0.8); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">🏥</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

export const EmergencyMap: React.FC<EmergencyMapProps> = ({
  patientPos = [12.9716, 77.5946],
  ambulancePos = [12.9680, 77.5890],
  hospitalPos = [12.9750, 77.6000],
  height = "400px"
}) => {
  const [currentAmb, setCurrentAmb] = useState<[number, number]>(ambulancePos);

  // Live GPS simulation movement along route
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAmb((prev) => {
        const deltaLat = (patientPos[0] - prev[0]) * 0.05;
        const deltaLng = (patientPos[1] - prev[1]) * 0.05;
        return [prev[0] + deltaLat, prev[1] + deltaLng];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [patientPos]);

  const routeToPatient = [currentAmb, patientPos];
  const routeToHospital = [patientPos, hospitalPos];

  return (
    <div style={{ height }} className="w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
      <MapContainer
        center={patientPos}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Patient Location Marker */}
        <Marker position={patientPos} icon={patientIcon}>
          <Popup className="custom-popup">
            <div className="text-slate-900 p-1 font-sans">
              <strong className="text-red-600 block">Emergency SOS Location</strong>
              <p className="text-xs text-slate-700 font-medium">Patient: John Doe</p>
              <p className="text-[11px] text-slate-500">Block 4 Metro Square</p>
            </div>
          </Popup>
        </Marker>

        {/* Ambulance Moving Marker */}
        <Marker position={currentAmb} icon={ambulanceIcon}>
          <Popup>
            <div className="text-slate-900 p-1">
              <strong className="text-blue-600 block">Advanced Ambulance AMB-ALS-901</strong>
              <p className="text-xs">Driver: Capt. Alex Vance</p>
              <p className="text-[11px] text-emerald-600 font-bold">Speed: 52 km/h • ETA: 4.2 mins</p>
            </div>
          </Popup>
        </Marker>

        {/* Hospital Marker */}
        <Marker position={hospitalPos} icon={hospitalIcon}>
          <Popup>
            <div className="text-slate-900 p-1">
              <strong className="text-emerald-700 block">City General Emergency Trauma Center</strong>
              <p className="text-xs">Level 1 Trauma Unit</p>
              <p className="text-[11px] text-blue-700 font-bold">ICU Beds Available: 6 / 15</p>
            </div>
          </Popup>
        </Marker>

        {/* Dynamic Route Lines */}
        <Polyline positions={routeToPatient} color="#3b82f6" weight={5} opacity={0.8} dashArray="10, 10" />
        <Polyline positions={routeToHospital} color="#10b981" weight={4} opacity={0.6} />
      </MapContainer>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-2.5 text-[11px] flex items-center space-x-4 shadow-xl">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500" />
          <span className="text-slate-300">Patient SOS</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500 animate-ping" />
          <span className="text-slate-300">Ambulance (Moving)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500" />
          <span className="text-slate-300">Target Hospital</span>
        </div>
      </div>
    </div>
  );
};
