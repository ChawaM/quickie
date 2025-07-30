import Link from 'next/link';
import { useState, useEffect } from 'react';
import React from 'react';
import tw from 'tailwind-styled-components';
import dynamic from 'next/dynamic';



const Wrapper = tw.div`bg-gray-300 h-screen overflow-y-auto`;
const ButtonContainer = tw.div`h-8 w-8 hover:scale-105 ml-3 mt-2`;
const BackButton = tw.img`h-6`;
const InputContainer = tw.div`bg-white flex items-center relative`;
const FromToIcon = tw.div``;
const Tofrom = tw.img``;
const InputBoxes = tw.div`flex flex-col flex-1 mt-2 mb-2 relative`;
const Input = tw.input`h-10 bg-gray-200 my-2 p-2 rounded-lg z-10`;
const SuggestionList = tw.ul`absolute top-20 bg-white w-full shadow-lg z-20 rounded-lg`;
const SuggestionItem = tw.li`p-2 hover:bg-gray-100 cursor-pointer`;
const PlusIcon = tw.img`h-10 mr-2 ml-2 bg-gray-200 rounded-full hover:scale-115`;
const SavedPlaces = tw.div`flex items-center bg-white px-2 mt-2`;
const StarIcon = tw.img`h-10 mr-1 bg-gray-200 rounded-full`;
const ConfirmLocation = tw.div`bg-green-800 flex items-center justify-center mt-2 px-30 py-3 mr-10 ml-10 rounded-lg hover:scale-105`;
const ConfirmButton = tw.div`text-white font-semibold text-lg text-center`;

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2hpcHVsdWsiLCJhIjoiY21kOGtzbDJpMDFodzJyc2doNDh3MWk4byJ9.LtmI-dBS2zvOPigPwPw1EQ';

const Map = dynamic(() => import('./components/Map'), { ssr: false })

const Search = () => {
  const [pickUp, setPickUp] = useState('');
  const [dropOff, setDropoff] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);

  // Auto-fill using geolocation + reverse geocoding
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { longitude, latitude } = position.coords;

        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}`
          );
          const data = await response.json();

          if (data.features?.[0]) {
            const location = data.features[0].place_name;
            setPickUp(location);
          }
        } catch (err) {
          console.error('Error getting location name:', err);
        }
      });
    }
  }, []);

  // Fetch suggestions for input text
  const fetchSuggestions = async (query, setSuggestions) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?autocomplete=true&access_token=${MAPBOX_TOKEN}`
      );
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error('Autocomplete fetch error:', error);
    }
  };

  return (
    <Wrapper>
      {/* Back button */}
      <Link href="/">
        <ButtonContainer>
          <BackButton src="back.webp" />
        </ButtonContainer>
      </Link>

      {/* Input fields */}
      <InputContainer>
        <FromToIcon>
          <Tofrom src="transit.png" />
        </FromToIcon>

        <InputBoxes>
          {/* Pickup */}
          <Input
            placeholder="From where"
            value={pickUp}
            onChange={(e) => {
              const val = e.target.value;
              setPickUp(val);
              fetchSuggestions(val, setPickupSuggestions);
            }}
          />
          {pickupSuggestions.length > 0 && (
            <SuggestionList>
              {pickupSuggestions.map((place) => (
                <SuggestionItem
                  key={place.id}
                  onClick={() => {
                    setPickUp(place.place_name);
                    setPickupSuggestions([]);
                  }}
                >
                  {place.place_name}
                </SuggestionItem>
              ))}
            </SuggestionList>
          )}

          {/* Dropoff */}
          <Input
            placeholder="Where to..?"
            value={dropOff}
            onChange={(e) => {
              const val = e.target.value;
              setDropoff(val);
              fetchSuggestions(val, setDropoffSuggestions);
            }}
          />
          {dropoffSuggestions.length > 0 && (
            <SuggestionList>
              {dropoffSuggestions.map((place) => (
                <SuggestionItem
                  key={place.id}
                  onClick={() => {
                    setDropoff(place.place_name);
                    setDropoffSuggestions([]);
                  }}
                >
                  {place.place_name}
                </SuggestionItem>
              ))}
            </SuggestionList>
          )}
        </InputBoxes>

        <PlusIcon src="plus.webp" />
      </InputContainer>

      {/* Saved places */}
      <SavedPlaces>
        <StarIcon src="starr.png" />
        Saved Places
      </SavedPlaces>

      {/* Confirm Button */}
      <Link
        href={{
          pathname: '/Confirm',
          query: {
            pickUp: pickUp,
            dropOff: dropOff,
          },
        }}
      >
        <ConfirmLocation style={{ backgroundColor: 'olive' }}>
          <ConfirmButton>Confirm Location</ConfirmButton>
        </ConfirmLocation>
      </Link>

      {/* Map display (optional or to be enhanced) */}
      <Map />
    </Wrapper>
  );
};

export default Search;
 