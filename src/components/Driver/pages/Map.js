import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Dimensions, Pressable, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import axios from "../../../config/axios";
import PassengerModal from "./PassengerModal";
import MessageModal from "./MessageModal";
import Notification from "./Notification";
import DOneNotif from "./Done";
import { useNetInfo } from "@react-native-community/netinfo";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Maps = (props) => {
  const [position, setPosition] = useState({
    latitude: 13.906576702674702,
    longitude: 121.50914479403703,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [passenger, setPassenger] = useState(null);
  const [isEnd, setEnd] = useState(null);
  const [isEndTxt, setEndTxt] = useState("Find Passenger");
  const [order, setOrder] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [directions, setDirections] = useState(null);
  const [curr, setCurr] = useState(null);
  const [disFind, setDisFind] = useState(false);
  const GOOGLE_MAPS_APIKEY = "AIzaSyBQ9MqRclkSV6qQ-yUXZC4qwElQJO5ovu8";
  const [visible2, setVisible2] = useState(false);
  const [dones, setDone] = useState(false);
  const [pick, setPick] = useState(false);
  const [visibleMessage, setMessageModal] = useState(false);
  const netInfo = useNetInfo();

  useEffect(() => {
    getNetworkStatus();
  }, []);
  const getNetworkStatus = async () => {
    if (netInfo.isConnected) {
      axios.put(`/drivers/status/${props.value.id}`).then((response) => {
        setEnd(response.data.data.isOnline);
      });

      axios.get(`/booking/currentDriver/${props.value.id}`).then((response) => {
        if (response.data.data === null) {
          setMessageModal(true);
        } else {
          setPassenger(response.data.data);
          setVisible2(true);
        }
      });
    }
  };

  const onRefresh = useCallback(() => {
    wait(2000).then(() =>
      axios.get(`/booking/myCurrent/${props.value.id}`).then((response) => {
        const res = response.data.data;
        if (res.status === 1) {
          setPick(true);
        }
        setCurr(response.data.data);
      })
    );
  }, []);
  const onPickup = useCallback(() => {
    wait(2000).then(() =>
      axios.get(`/booking/myCurrent/${props.value.id}`).then((response) => {
        const res = response.data.data;
        setDone(true);
        setPick(false);
        setCurr(res);
      })
    );
  }, []);
  const onUserLocationChange = async (event) => {
    const { latitude, longitude, heading } = event.nativeEvent.coordinate;
    // Update the car and set it to active
    const input = {
      latitude,
      longitude,
      heading,
    };

    try {
      await axios.put(`/drivers/${props.value.id}`, {
        latitude: input.latitude,
        longitude: input.longitude,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onGetCurrentPassenger = async () => {
    axios.get(`/booking/myCurrent/${props.value.id}`).then((response) => {
      const result = response.data.data;
      const bookedCar = {
        destLatitude: JSON.parse(result.booking_details).destination.lat,
        destLongitude: JSON.parse(result.booking_details).destination.long,
        originLatitude: JSON.parse(result.booking_details).origin.lat,
        originLongitude: JSON.parse(result.booking_details).origin.long,
      };
      setDirections({
        latitude: bookedCar.destLatitude,
        longitude: bookedCar.destLongitude,
      });
      setOrigin({
        latitude: parseFloat(bookedCar.originLatitude),
        longitude: parseFloat(bookedCar.originLongitude),
      });
      setOrder(bookedCar);
      setDisFind(true);
    });
  };
  const onGetPassenger = () => {
    if (netInfo.isConnected) {
      console.log(
        "🚀 ~ file: Map.js ~ line 40 ~ onGetDrivers ~ netInfo.isConnected",
        netInfo.isConnected
      );
      axios.put(`/drivers/status/${props.value.id}`).then((response) => {
        setEnd(response.data.data.isOnline);
      });
      if (isEnd) {
        setEndTxt("End Now");
        axios
          .get(`/booking/currentDriver/${props.value.id}`)
          .then((response) => {
            if (response.data.data === null) {
              setMessageModal(true);
            } else {
              setPassenger(response.data.data);
              setVisible2(true);
            }
          });
      } else {
        setEndTxt("Find Passenger");
      }
    }
  };
  const onStartRide = (event) => {
    console.log("🚀 ~ file: Map.js ~ line 114 ~ onStartRide ~ event", event);
    const origin = `${order.originLatitude},${order.originLongitude}`;
    const des = `${order.destLatitude},${order.destLongitude}`;
    console.log("🚀 ~ file: Map.js ~ line 117 ~ onStartRide ~ order", order);
    if (event.origin === origin) {
      onRefresh();
    } else if (event.destination === des) {
    }
  };
  return (
    <View>
      <MapView
        style={{ width: "100%", height: Dimensions.get("window").height }}
        initialRegion={position}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        onUserLocationChange={onUserLocationChange}
        apikey={GOOGLE_MAPS_APIKEY}
        onDoublePress={getNetworkStatus}
      >
        {order && (
          <MapViewDirections
            origin={origin}
            destination={directions}
            onStart={(params) => {
              onStartRide(params);
            }}
            strokeWidth={5}
            strokeColor="#132875"
            apikey={GOOGLE_MAPS_APIKEY}
          />
        )}
        {order && (
          <Marker
            coordinate={directions}
            showsUserLocation={true}
            image={require("../../../img/flag.png")}
          />
        )}
      </MapView>
      <Pressable
        onPress={() => console.warn("Balance")}
        style={styles.balanceButton}
      >
        <Text style={styles.balanceText}>
          <Text style={styles.balanceText}>₱</Text> 15.00 per 4 km
        </Text>
      </Pressable>

      {/* <Pressable
        onPress={onGetPassenger}
        style={disFind ? styles.goDis : styles.goButton}
        disabled={disFind}
      >
        <Text style={styles.goText}>{isEndTxt}</Text>
      </Pressable> */}

      {passenger !== null && (
        <PassengerModal
          visibles={visible2}
          setVisible={setVisible2}
          passengerDetail={passenger}
          setPassenger={setPassenger}
          setEnd={setEnd}
          setEndTxt={setEndTxt}
          onGetCurrentPassenger={onGetCurrentPassenger}
        />
      )}
      {/* <MessageModal visibles={visibleMessage} setVisible={setMessageModal} /> */}
      <Notification
        pick={pick}
        setPick={setPick}
        passenger={curr}
        onPickup={onPickup}
      />
      <DOneNotif
        dones={dones}
        setDone={setDone}
        passenger={curr}
        setDisFind={setDisFind}
        setOrder={setOrder}
      />
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
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    bottom: 110,
    left: Dimensions.get("window").width / 2 - 37,
  },
  goDis: {
    position: "absolute",
    backgroundColor: "gray",
    width: 100,
    height: 100,
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
