import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import tw from 'tailwind-styled-components'
import {useEffect } from 'react'
import Link from "next/link";
import Search from "./Search";
import Map from "./components/Map";


const Wrapper = tw.div`
flex flex-col h-screen`
 
const ActionItems = tw.div`
flex-1 p-4`

const Header = tw.div`
flex justify-between items-center`

const Logo = tw.img`
h-20
rounded-lg`

const Profile = tw.div`
flex items-center`

const Name = tw.div`
mr-4 w20`

const UserImage = tw.img`
h-28
w-28
rounded-full 
border-gray-200 
p-px`

const ActionButtons = tw.div`
flex justify-between`

const ActionButton = tw.div`
flex
bg-gray-200
flex-1
m-1 
h-32 
items-center 
flex-col 
justify-center
rounded-lg
transform hover:scale-105 transition
text-xl`

const ActionButtonImage = tw.img`
h-3/5 `

const InputButton = tw.div`
h-20
bg-gray-200 
text-xl 
rounded-lg 
mt-8
p-4
flex item-center`


export default function Home() {

 
  return (
  <Wrapper>
    <Map/>
    <ActionItems>
     <Header>
      <Logo src = "/logo.png"/>
      <Profile>
        <Name>hello User</Name>
        <UserImage src  = "blankProfilePic.jpg"/>
      </Profile>
     </Header>
     <ActionButtons>
      <Link href='/Search'>
      <ActionButton>
        <ActionButtonImage src = "UberBlack.webp"/>
        Ride
      </ActionButton>
      </Link >
      <Link href="/Search">
      <ActionButton>
        <ActionButtonImage src = "delivery.png"/>
        Delivery
      </ActionButton>
      </Link>
      <Link href="Search">
      <ActionButton>
        <ActionButtonImage src = "reserve.png"/>
        Reserve
      </ActionButton>
      </Link>
     </ActionButtons>
     <InputButton>
      Where to?
     </InputButton>      
    </ActionItems>
  </Wrapper>
  );
}



