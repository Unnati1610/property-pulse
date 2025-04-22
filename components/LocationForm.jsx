"use client";

import { useEffect, useState } from "react";
import { State, City } from "country-state-city";

const LocationForm = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const indianStates = State.getStatesOfCountry("IN");
    setStates(indianStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      const stateObj = states.find((state) => state.name === selectedState);
      const cities = City.getCitiesOfState("IN", stateObj.isoCode);
      setCities(cities);
      setSelectedCity("");
    }
  }, [selectedState]);

  return (
    <>
      <select
        id="state"
        name="location.state"
        className="border rounded w-full py-2 px-3 mb-2"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        required
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state.isoCode} value={state.name}>
            {state.name}
          </option>
        ))}
      </select>
      <select
        id="city"
        name="location.city"
        className="border rounded w-full py-2 px-3 mb-2"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        disabled={!selectedState}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default LocationForm;
