import { useState } from "react";

export const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState("");
    const [latLong, setLatLong] = useState("");
    const [isFindingLocation, setIsFindingLocation] = useState(false);

    const success = (position: GeolocationPosition) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLatLong(`${latitude},${longitude}`);
        setIsFindingLocation(false);
    };

    const error = () => {
        setLocationErrorMsg("Unable to retrieve your location");
        setIsFindingLocation(false);
    };

    const handleTrackLocation = () => {
        setIsFindingLocation(true);
        if (!navigator.geolocation) {
            setLocationErrorMsg("Geolocation is not supported by your browser");
            setIsFindingLocation(false);
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
        isFindingLocation,
    };
};
