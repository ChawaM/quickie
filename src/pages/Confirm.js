import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import Map from './components/Map';
import { useRouter } from 'next/router';
import RideSelector from './components/RideSelector';
import Link from 'next/link';

const Wrapper = tw.div`
  flex flex-col h-screen
`;

const RideContainer = tw.div`
  flex flex-1 flex-col my-2
`;

const ConfirmButtonContainer = tw.div`
  mt-2 mx-8 items-center border-t-2
`;

const ConfirmButton = tw.div`
  text-center text-xl py-2 px-2
`;

const ButtonContainer = tw.div`
  h-8 w-8 hover:scale-105 ml-3
`;

const BackButton = tw.img`
  h-6
`;

const Confirm = () => {
  const router = useRouter();
  const { pickUp, dropOff } = router.query;

  const [pickupCoordinates, setPickupCoordinates] = useState([0, 0]);
  const [dropoffCoordinates, setDropoffCoordinates] = useState([0, 0]);

  // Fetch pickup coordinates
  const getPickupCoordinates = (location) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?` +
        new URLSearchParams({
          access_token: 'pk.eyJ1IjoiY2hpcHVsdWsiLCJhIjoiY21kOGtzbDJpMDFodzJyc2doNDh3MWk4byJ9.LtmI-dBS2zvOPigPwPw1EQ',
          limit: 1,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.features[0]) {
          setPickupCoordinates(data.features[0].center);
        }
      });
  };

  // Fetch dropoff coordinates
  const getDropoffCoordinates = (location) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?` +
        new URLSearchParams({
          access_token: 'pk.eyJ1IjoiY2hpcHVsdWsiLCJhIjoiY21kOGtzbDJpMDFodzJyc2doNDh3MWk4byJ9.LtmI-dBS2zvOPigPwPw1EQ',
          limit: 1,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.features[0]) {
          setDropoffCoordinates(data.features[0].center);
        }
      });
  };

  // Fetch both when pickUp or dropOff changes
  useEffect(() => {
    if (pickUp) getPickupCoordinates(pickUp);
    if (dropOff) getDropoffCoordinates(dropOff);
  }, [pickUp, dropOff]);

  return (
    <Wrapper>
      <Link href="/Search">
        <ButtonContainer>
          <BackButton src="back.webp" />
        </ButtonContainer>
      </Link>

      <Map pickupCoordinates={pickupCoordinates} dropoffCoordinates={dropoffCoordinates} />

      <RideContainer>
        <RideSelector
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
        />
        <ConfirmButtonContainer style={{ backgroundColor: 'olive' }}>
          <ConfirmButton>
            Confirm Ride
          </ConfirmButton>
        </ConfirmButtonContainer>
      </RideContainer>
    </Wrapper>
  );
};

export default Confirm;
