import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, View } from "react-native";
import { DataTable } from "react-native-paper";
import { Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import DialogBox from "./Dialog";
import axios from "../../../config/axios";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Users = (props) => {
  const [rows, setRows] = useState([]);
  const [visible, setVisible] = useState(false);

  const onRefresh = useCallback(() => {
    wait(2000).then(() =>
      axios.get("admin/user").then((response) => {
        setRows(response.data.data);
      })
    );
  }, []);

  const hideDialog = () => {
    setVisible(false);
  };
  const showDialog = () => {
    setVisible(true);
  };
  useEffect(() => {
    axios.get("admin/user").then((response) => {
      setRows(response.data.data);
    });
  }, []);

  async function handleAccept(e) {
    const update = await axios.put(`/admin/user/approve/${e}`);
    console.log(
      "🚀 ~ file: Users.js ~ line 27 ~ handleAccept ~ update",
      update
    );
    onRefresh();
  }
  async function handleReject(e) {
    const update = await axios.put(`/admin/user/reject/${e}`);
    console.log(
      "🚀 ~ file: Users.js ~ line 27 ~ handleAccept ~ update",
      update
    );
    onRefresh();
  }
  return (
    <View style={{ marginTop: 20 }}>
      <ScrollView horizontal={true}>
        <DataTable style={{ paddingLeft: 5, paddingRight: 5, flex: 1 }}>
          <DataTable.Header>
            <DataTable.Title style={{ width: 200 }}>Name</DataTable.Title>
            <DataTable.Title style={{ width: 200 }}>Email</DataTable.Title>
            <DataTable.Title style={{ width: 200 }}>Role</DataTable.Title>
            <DataTable.Title style={{ width: 200 }}>Status</DataTable.Title>
            <DataTable.Title style={{ width: 350 }}>Actions</DataTable.Title>
          </DataTable.Header>

          {rows.map((item) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell
                style={{ width: 100 }}
              >{`${item.fname} ${item.lname}`}</DataTable.Cell>
              <DataTable.Cell style={{ width: 100 }}>
                {item.email}
              </DataTable.Cell>
              <DataTable.Cell style={{ width: 100 }}>
                {item.roleID === 1
                  ? "Admin"
                  : item.roleID === 2
                  ? "Driver"
                  : "Passenger"}
              </DataTable.Cell>
              <DataTable.Cell style={{ width: 100 }}>
                {item.status === 1
                  ? "Active"
                  : item.roleID === 2
                  ? "Pending"
                  : "Not Active"}
              </DataTable.Cell>
              <DataTable.Cell style={{ width: 275 }} center>
                <Button
                  variant="text"
                  title="Accept"
                  color="#132875"
                  disabled={item.status === 1}
                  onPress={() => {
                    handleAccept(item.id);
                  }}
                />
                <Button
                  variant="text"
                  title="Reject"
                  color="red"
                  disabled={item.status === 3 || item.status === 2}
                  onPress={() => {
                    handleReject(item.id);
                  }}
                />
                <Button
                  variant="text"
                  leading={(props) => <Icon name="delete" {...props} />}
                  color="red"
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
      <DialogBox values={visible} hideModal={hideDialog} />
    </View>
  );
};

export default Users;
