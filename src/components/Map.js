import React from 'react'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { icon } from 'leaflet';

const ICON = icon({
    iconUrl: "./marker.svg",
    iconSize: [16,16],
})


export default function Map({ countryMonth }) {
    return (
        <MapContainer center={[countryMonth.Lat, countryMonth.Lon]} zoom={1} scrollWheelZoom={false} style={{height: 200, width: "99%", margin: "auto"}}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={ICON} position={[countryMonth.Lat, countryMonth.Lon]}>
                <Popup>
                {countryMonth.Country} is located here.
                </Popup>
            </Marker>
        </MapContainer>
    )
}
