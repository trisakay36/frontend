import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  Text,
  Image,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Entypo from "react-native-vector-icons/Entypo";
import Geolocation from "@react-native-community/geolocation";
import NewOrderPopup from "./NewOrder";
import axios from "../../../config/axios";
import DriverModal from "./DriverModal";
import MessageModal from "./MessageModal";
import Booking from "./Booking";
import { useNetInfo } from "@react-native-community/netinfo";

const Maps = (props) => {
  const [position, setPosition] = useState({
    latitude: 13.906576702674702,
    longitude: 121.50914479403703,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [car, setCar] = useState(null);
  const [isEnd, setEnd] = useState(true);
  const [isEndTxt, setEndTxt] = useState("Find Driver");
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [visible2, setVisible2] = useState(false);
  const [visibleMessage, setMessageModal] = useState(false);
  const [order, setOrder] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [directions, setDirections] = useState(null);
  const [booked, setBooked] = useState(false);
  const [books, setBooks] = useState(false);
  const GOOGLE_MAPS_APIKEY = "AIzaSyBQ9MqRclkSV6qQ-yUXZC4qwElQJO5ovu8";
  const netInfo = useNetInfo();

  const onUserLocationChange = async (event) => {
    const { latitude, longitude, heading } = event.nativeEvent.coordinate;
    // Update the car and set it to active
    try {
      const input = {
        latitude,
        longitude,
        heading,
      };
      setPosition({ latitude: input.latitude, longitude: input.longitude });
      await axios.put(`/passengers/${props.value.id}`, {
        latitude: input.latitude,
        longitude: input.longitude,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onBookDriver = (data) => {
    setVisible2(true);
    setSelectedDriver(data);
  };

  const onGetDrivers = async () => {
    if (netInfo.isConnected) {
      console.log(
        "🚀 ~ file: Map.js ~ line 67 ~ onGetDrivers ~ netInfo.isConnected",
        netInfo.isConnected
      );
      const value = await axios.put(`/passengers/status/${props.value.id}`);
      setEnd(value.data.data.isOnline);
      if (isEnd) {
        setEndTxt("End Now");
        axios.get("/drivers").then((response) => {
          setDrivers(response.data.data);
          if (response.data.data.length === 0) {
            setMessageModal(true);
          }
        });
      } else {
        setDrivers([]);
        setEndTxt("Find Driver");
      }
    }
  };

  return (
    <View>
      {booked && true && (
        <Booking
          booksID={books}
          setBookeds={setBooked}
          setEndTxt={setEndTxt}
          setDrivers={setDrivers}
        />
      )}
      <View>
        <MapView
          style={{
            width: "100%",
            height: Dimensions.get("window").height,
          }}
          initialRegion={position}
          showsUserLocation={true}
          onUserLocationChange={onUserLocationChange}
          provider={PROVIDER_GOOGLE}
          //apikey={GOOGLE_MAPS_APIKEY}
        >
          {order && (
            <MapViewDirections
              origin={origin}
              //onReady={onDirectionFound}
              destination={directions}
              strokeWidth={5}
              strokeColor="#132875"
              apikey={GOOGLE_MAPS_APIKEY}
            />
          )}
          {drivers.length > 0 &&
            drivers.map((item) => (
              <Marker
                key={item.id}
                coordinate={{
                  longitude: parseFloat(item.longitude),
                  latitude: parseFloat(item.latitude),
                }}
                title={`${item.fname} ${item.lname}`}
                onPress={() => {
                  onBookDriver(item);
                }}
              >
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    resizeMode: "contain",
                  }}
                  source={require("../../../img/marker.png")}
                />
              </Marker>
            ))}
        </MapView>
        <Pressable
          onPress={() => console.warn("Balance")}
          style={styles.balanceButton}
        >
          <Text style={styles.balanceText}>
            <Text style={styles.balanceText}>₱</Text> 15.00 per 4 km
          </Text>
        </Pressable>

        <Pressable onPress={onGetDrivers} style={styles.goButton}>
          <Text style={styles.goText}>{isEndTxt}</Text>
        </Pressable>
      </View>

      {selectedDriver !== null && (
        <DriverModal
          visibles={visible2}
          setVisible={setVisible2}
          driverDetail={selectedDriver}
          passengerID={props.value.id}
          setBookeds={setBooked}
          setBookss={setBooks}
        />
      )}
      <MessageModal visibles={visibleMessage} setVisible={setMessageModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomText: {
    fontSize: 22,
    color: "#4a4a4a",
  },
  roundButton: {
    position: "absolute",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 25,
  },
  goButton: {
    position: "absolute",
    backgroundColor: "#132875",
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    bottom: 110,
    left: Dimensions.get("window").width / 2 - 37,
  },
  goText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  balanceButton: {
    position: "absolute",
    backgroundColor: "#1c1c1c",
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    top: 10,
    left: Dimensions.get("window").width / 2 - 100,
  },
  balanceText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default Maps;
