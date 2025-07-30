import React from 'react'
import tw from 'tailwind-styled-components'
import { carList } from '../../data/data'
import { useEffect, useState } from 'react'
import App from '../_app'

const RideSelector = ({pickupCoordinates, dropoffCoordinates}) => {

    const [rideDuration, SetRideDuration]  = useState(0)

    useEffect(()=>{

        if (
    pickupCoordinates &&
    dropoffCoordinates &&
    pickupCoordinates.length === 2 &&
    dropoffCoordinates.length === 2
  )
    fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=pk.eyJ1IjoiY2hpcHVsdWsiLCJhIjoiY21kOGtzbDJpMDFodzJyc2doNDh3MWk4byJ9.LtmI-dBS2zvOPigPwPw1EQ `)
            .then(res =>res.json())
            .then(data =>
                {
                  const durationInMinutes = data.routes[0]?.duration/60 || 0
                  SetRideDuration(durationInMinutes) })
    }, [pickupCoordinates, dropoffCoordinates])


  return (
    <Wrapper>
       <Title>Choose a Ride</Title>
       <CarList>
        {carList.map((car, index)=>(
         <Car key = {index}>
        <CarImage src = {car.imgurl}/>
            <CarDetails>
                <Service>
                    {car.service}
                </Service>
                <Time>
                    2 mins away
                </Time>
           </CarDetails>
           <Price>
            {"K" + (rideDuration * car.multiplier).toFixed(2) }
          </Price>
        </Car>

        ))}
        

       </CarList>
    </Wrapper>
  )
}

export default RideSelector

const Wrapper = tw.div`
flex-1`

const Title = tw.div`
bg-gray-300
text-center 
border-b `

const CarList = tw.div``

const Car = tw.div`
flex p-4 items-center`

const CarImage = tw.img` 
mr-2 `

const CarDetails = tw.div`
flex-1 items-center`

const Service = tw.div``

const Time = tw.div`
text-xs`

const Price = tw.div``
