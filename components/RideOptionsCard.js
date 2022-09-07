import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@rneui/themed'
import tw from "twrnc"
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import Currency from 'react-currency-formatter';
import { selectTravelTimeInformation } from '../slices/navSlice'


const data = [
  {
    id: "Uber-X-123",
    title: "Uber X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
]

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation()
  const [selected, setSelected] = useState(null)
  const travelTimeInformation = useSelector(selectTravelTimeInformation)

  return (
    <SafeAreaView style={tw`bg-white flex-grow -mt-6`}>
      <View style={tw`h-1/10`}>
        <TouchableOpacity 
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute left-5 z-50 p-2 rounded-full`}>
          <Icon name="chevron-left" type="fontawesome"/>
        </TouchableOpacity>
        <Text style={tw`text-center p-1 text-xl`}>
          Select a ride - {travelTimeInformation?.distance.text}
        </Text>

      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity 
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-6 ${id === selected?.id && "bg-gray-200"}`}
          >
            <Image 
              style={{
                width: 80,
                height: 80,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
            </View>
            <Text style={tw`text-lg`}>
              
              <Currency
              
              quantity={
                (travelTimeInformation?.duration.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                100
              }
              currency="GBP"
              />

            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity 
        disabled={!selected}
          style={tw`bg-black py-3 m-3 my-2 rounded-lg 
            ${!selected && "bg-gray-300"}`
          }
        >
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard