import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView } from "react-native";
import {
  Stack,
  VStack,
  Text,
  HStack,
  Button,
  Flex,
  AppBar,
  IconButton,
} from "@react-native-material/core";
import styles from "../../Stylesheet";
import axios from "../../../config/axios";
import Geocoder from "react-native-geocoding";
import { getDistance } from "geolib";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Dimensions } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Notification from "./Notification";
import NotificationDone from "./NotificationDone";

const screenWidth = Dimensions.get("window").width;

export default function Booking(props) {
  const [driverData, setDriverData] = useState(null);
  const [passengerData, setPassengerData] = useState(null);
  const [myAddress, setCurrentAddress] = useState(null);
  const GOOGLE_MAPS_APIKEY = "AIzaSyBQ9MqRclkSV6qQ-yUXZC4qwElQJO5ovu8";
  const [places, setPlaces] = useState("");
  const [fee, setFee] = useState(8);
  const [destinations, setDestinations] = useState(0);
  const [distance, setDistance] = useState(4);
  const [booked, setBooked] = useState(false);
  const [isPick, setPick] = useState(false);
  const [isDone, setDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState(null);
  const [isCancel, setCancell] = useState(true);

  const onRefresh = async () => {
    const res = await axios.get(`/booking/pickup/${props.booksID.passengerID}`);
    let results = res.data.data;
    if (results && results.status === 4) {
      setPick(true);
    } else if (results && results.status === 5) {
      setDone(true);
    }
  };

  useEffect(() => {
    axios.get(`/drivers/${props.booksID.driverID}`).then((response) => {
      setDriverData(response.data.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`/passengers/${props.booksID.passengerID}`).then((response) => {
      setPassengerData(response.data.data);
      Geocoder.init(GOOGLE_MAPS_APIKEY);
      Geocoder.from(response.data.data.latitude, response.data.data.longitude)
        .then((json) => {
          const { formatted_address, place_id, geometry } = json.results[0];
          setCurrentAddress(formatted_address);
        })
        .catch((error) => console.warn(error));
    });
  }, []);

  const getMarker = (data, details) => {
    setPlaces(data.description);
    const dis = getDistance(
      {
        latitude: passengerData.latitude,
        longitude: passengerData.longitude,
      },
      {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      }
    );
    setDestinations({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
    let dstn = dis / 1000;
    setDistance(dis / 1000);
    setFee(parseFloat((dstn - 4) * 0.5 + 15).toFixed(2));
  };

  const onBookDriver = async () => {
    try {
      const payload = {
        passengerID: props.booksID.passengerID,
        driverID: props.booksID.driverID,
        fee,
        origin: {
          lat: passengerData.latitude,
          long: passengerData.longitude,
        },
        destination: {
          lat: destinations.latitude,
          long: destinations.longitude,
        },
        distance: distance,
      };
      const res = await axios.post("/booking", payload);
      setResult(res.data.data);
      setBooked(true);
      setCancell(false);
    } catch (error) {
      if (error) {
        if (destinations === 0) {
          setErrorMsg("Ang destinasyon hindi maaring wala sa pag book!");
        }
      }
    }
  };
  const onBookCancel = async () => {
    try {
      const res = await axios.put(
        `/booking/cancell/${props.booksID.driverID}`,
        {
          passengerID: props.booksID.passengerID,
        }
      );
      console.log("🚀 ~ file: Booking.js ~ line 124 ~ onBookCancel ~ res", res);
      props.setBookeds(false);
      props.setDrivers([]);
      props.setEndTxt("Find Driver");
    } catch (error) {
      console.log(
        "🚀 ~ file: Booking.js ~ line 108 ~ onBookCancel ~ error",
        error
      );
    }
  };
  const indexPage = (
    <Stack fill>
      <AppBar
        color="#132875"
        leading={(props) => (
          <IconButton
            disabled={result === null ? true : false}
            icon={(props) => <Icon name="reload" {...props} />}
            {...props}
            onPress={onRefresh}
          />
        )}
      />
      <VStack
        fill
        style={{
          width: screenWidth - 50,
          minWidth: screenWidth - 50,
          height: 200,
          margin: 20,
        }}
      >
        <Notification
          isPick={isPick}
          setPicks={setPick}
          setCancell={setCancell}
        />
        <NotificationDone
          isDone={isDone}
          setDone={setDone}
          setBookeds={props.setBookeds}
          setEndTxt={props.setEndTxt}
          setDrivers={props.setDrivers}
        />
        <Flex fill>
          <HStack m={6} spacing={6}>
            <GooglePlacesAutocomplete
              placeholder="Search"
              onPress={getMarker}
              query={{
                key: "AIzaSyBQ9MqRclkSV6qQ-yUXZC4qwElQJO5ovu8",
                language: "en",
              }}
              enablePoweredByContainer={false}
              autoFocus={true}
              returnKeyType={"search"}
              fetchDetails={true}
              GooglePlacesDetailsQuery={{
                fields: "geometry",
              }}
              GooglePlacesSearchQuery={{
                rankby: "distance",
              }}
              style={{
                description: {
                  fontWeight: "bold",
                },
                predefinedPlacesDescription: {
                  color: "#FFFFF",
                },
                textInputContainer: {
                  backgroundColor: "rgba(0,0,0,0)",
                  width: screenWidth - 50,
                  borderWidth: 0,
                  margin: 5,
                  top: 23,
                  flex: 1,
                  position: "absolute",
                  left: 0,
                  top: 0,
                  opacity: 0.5,
                },
                textInput: {
                  margin: 5,
                  color: "#5d5d5d",
                  fontSize: 16,
                  borderWidth: 0,
                },
                listView: {
                  backgroundColor: "rgba(192,192,192,0.9)",
                  top: 23,
                  flex: 1,
                  position: "absolute",
                  left: 0,
                  top: 0,
                  opacity: 0.5,
                },
              }}
              debounce={200}
            />
          </HStack>
          <View>
            <ScrollView contentContainerStyle={styles.scrollView}>
              {errorMsg ? (
                <Text variant="subtitle1" style={styles.txtError}>
                  {errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1)}
                </Text>
              ) : null}
              <HStack m={6} spacing={6}>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtBlue,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Pangalan:
                </Text>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtGray,
                    textAlign: "left",
                  }}
                >
                  {passengerData &&
                    `${passengerData.fname} ${passengerData.lname}`}
                </Text>
              </HStack>

              <HStack m={6} spacing={6}>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtBlue,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Pangalan ng Drayber:
                </Text>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtBlue,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                ></Text>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtGray,
                    textAlign: "left",
                  }}
                >
                  {driverData && `${driverData.fname} ${driverData.lname}`}
                </Text>
              </HStack>
              <HStack m={6} spacing={6}>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtBlue,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Panggagalingan:
                </Text>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtGray,
                    textAlign: "left",
                    width: 250,
                  }}
                >
                  {myAddress}
                </Text>
              </HStack>
              <HStack m={6} spacing={6}>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtBlue,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Destinasyon:
                </Text>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtGray,
                    textAlign: "left",
                    width: 250,
                  }}
                >
                  {places}
                </Text>
              </HStack>
              <HStack m={6} spacing={6}>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtBlue,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Distansya:
                </Text>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtGray,
                    textAlign: "left",
                  }}
                >
                  {`${distance} km`}
                </Text>
              </HStack>
              <HStack m={6} spacing={6}>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtBlue,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Pamasahe:
                </Text>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtGray,
                    textAlign: "left",
                  }}
                >
                  {`₱ ${parseFloat(fee)}`}
                </Text>
              </HStack>
              <Button
                title="MagBook"
                color="#FFFFFF"
                variant="outlined"
                disabled={booked || isPick}
                style={{
                  ...styles.btnBlue,
                  width: screenWidth - 50,
                  marginTop: 10,
                }}
                onPress={onBookDriver}
              />
              <Button
                title="Kanselahin"
                color="#FFFFFF"
                variant="outlined"
                disabled={isCancel}
                onPress={onBookCancel}
                style={{
                  ...styles.btnGreen,
                  width: screenWidth - 50,
                  marginTop: 10,
                }}
              />
            </ScrollView>
          </View>
        </Flex>
      </VStack>
    </Stack>
  );
  return <View style={{ ...styles.textWrapper }}>{indexPage}</View>;
}
