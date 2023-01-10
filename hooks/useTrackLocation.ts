import { useState } from "react";

export const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState("");
    const [latLong, setLatLong] = useState("");

    const success = (position: GeolocationPosition) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLatLong(`${latitude},${longitude}`);
    };

    const error = () => {
        setLocationErrorMsg("Unable to retrieve your location");
    };

    const handleTrackLocation = () => {
        if (!navigator.geolocation) {
            setLocationErrorMsg("Geolocation is not supported by your browser");
        } else {
            // console.log("Locating…");
            navigator.geolocation.getCurrentPosition(success, error);
            setLocationErrorMsg("");
        }
    };

    return {
        latLong,
        handleTrackLocation,
        locationErrorMsg,
    };
};
