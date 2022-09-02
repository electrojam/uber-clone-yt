import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import tw from "twrnc"
import { selectOrigin } from '../slices/navSlice'
import { useSelector } from 'react-redux'

const Map = () => {
  const origin = useSelector(selectOrigin);

  return (
    <MapView
    style={tw`flex-1`}
    initialRegion={{
      latitude: origin.location.lat,
      longitude: origin.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }}
    >
      <Marker 
        coordinate={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
        }}
        title="Origin"
        description={origin.description}
        identifier="origin"
      />
    </MapView>
  )
}

export default Map;

const styles = StyleSheet.create({})