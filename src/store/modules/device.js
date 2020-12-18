import axios from "axios";
const api = axios.create({
  // baseURL: "http://103.7.57.141:8083/tempurature/web",
  baseURL: "https://cold-room-backoffice.andamantracking.dev/temperature/web",
  headers: { crossdomain: true, "Access-Control-Allow-Origin": "*" },
  mode: "no-cors"
});

const state = {
  deviceTableLoading: false,
  deviceList: [],
  userData: [],
  userListId: [],
  searchResult: "",
  addDeviceResult: []
};

const getters = {};

const actions = {
  login: async ({ commit }, payload) => {
    let resData = {
      data: true
    };
    await api
      .post("/login", {
        username: payload.username,
        password: payload.password
      })
      .then(res => {
        resData = res;
        let timeStamp = Date.parse(res.data.loginAt);
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: payload.username
          })
        );
        localStorage.setItem("loginAt", timeStamp);
        console.log(res);
      })
      .catch(error => {
        console.log("Get Device List Error :", error.message);
        resData = error;
      });
    return resData;
  },
  logout: async ({ commit }) => {
    localStorage.removeItem("user");
    localStorage.removeItem("loginAt");
    return true;
  },
  register: async ({ commit, state }, payload) => {
    let res;
    await api
      .post("/register", {
        username: payload.username,
        password: payload.password,
        firstname: payload.firstname,
        lastname: payload.lastname,
        phone: payload.phone,
        lineKey: payload.lineKey,
        deviceID: payload.deviceID
      })
      .then(respone => {
        res = respone.data;
        console.log(respone);
      })
      .catch(error => console.log("Register Error : ", error.message));
    return res;
  },
  addDevice: async ({ commit, state }, payload) => {
    let response;
    await api
      .post("/addDevice", {
        imei: payload.imei,
        name: payload.name,
        maxTemp: payload.maxTemp,
        minTemp: payload.minTemp,
        sendLine: payload.sendLine,
        userID: payload.userID,
        isEnabled: payload.isEnabled
      })
      .then(res => {
        // console.log(res);
        response = res.data;
      })
      .catch(error => {
        console.log("ADD DEVICE ERROR :", error);
      });
    return response;
  },
  updateDevice: async ({ commit, state }, payload) => {
    // console.log(payload);
    api
      .put("/updateDevice", {
        deviceID: payload.deviceID,
        name: payload.name,
        imei: payload.imei,
        currentTemp: payload.currentTemp,
        maxTemp: payload.maxTemp,
        minTemp: payload.minTemp,
        sendLine: payload.sendLine,
        userID: payload.userID,
        isEnabled: payload.isEnabled
      })
      .then(res => {
        // console.log(res);
        commit("SET_UPDATE_DEVICE", payload);
      })
      .catch(error => {
        console.log(error);
      });
  },
  updateUser: async ({ commit, state }, payload) => {
    // console.log(payload);
    api
      .put("/updateUser", {
        userID: payload.userID,
        username: payload.username,
        firstname: payload.firstname,
        lastname: payload.lastname,
        phone: payload.phone,
        lineKey: payload.lineKey,
        user_enable: payload.user_enable
      })
      .then(res => {
        // console.log("Update User : ", res);
        commit("SET_UPDATE_USER", res.data);
      })
      .catch(error => console.log("Update User Error : ", error));
  },
  getDeviceList: async ({ commit, state }) => {
    commit("SET_DEVICETABLE_LOAD", true);
    api
      .get("/deviceList")
      .then(res => {
        // console.log(res);
        commit("SET_DEVICE_LIST", res.data);
        res.data.map(device => {
          if (
            device.userName !== "-" &&
            (state.userListId.filter(name => name === device.userName).length >=
            1
              ? false
              : true)
          ) {
            commit("SET_USERLIST_ID", device.userName);
          }
        });
        if (state.userListId.filter(name => name === "Show All").length < 1) {
          commit("SET_USERLIST_ID", "Show All");
        }
      })
      .catch(error => console.log("Get Device List Error :", error));
    commit("SET_DEVICETABLE_LOAD", false);
  },
  getUserList: async ({ commit, state }) => {
    api
      .get("/userList")
      .then(res => {
        // console.log(res);
        commit("SET_USER_LIST", res.data);
      })
      .catch(error => {
        console.log("Get User List Error :", error);
      });
  },
  addUserDevice: async ({ commit }, payload) => {
    await api
      .put("/addUserDevice", {
        userID: payload.userID,
        deviceID: payload.deviceID
      })
      .then(res => {
        // console.log("add device", res);
        if (res.data) {
          commit("SET_ADD_DEVICE_RESULT", res.data.deviceID);
          commit("SET_USER_DEVICE", {
            userID: payload.userID,
            deviceID: res.data.deviceID
          });
        }
      })
      .catch(error => {
        console.log("Add user's Device Error : ", error);
      });
  },
  removeUserDevice: async ({ commit }, payload) => {
    api
      .put("/removeUserDevice", {
        userID: payload.userID,
        deviceID: payload.deviceID
      })
      .then(res => {
        // console.log("remove device", res);
      })
      .catch(error => {
        console.log("Add user's Device Error : ", error);
      });
  },
  searhDeviceByID: async ({ commit }, payload) => {
    commit("CLEAR_SEARCH_RESULT");
    api
      .get(`/searchDeviceByID`, {
        headers: {
          deviceID: payload
        }
      })
      .then(res => {
        // console.log(res);
        if (res.data.isEnabled === true) {
          commit("SET_SEARCH_RESULT", res.data);
        }
      })
      .catch(error => {
        console.log("searchDeviceByID Error : ", error);
      });
  },
  resetPassword: async ({ commit }, payload) => {
    api
      .put("/resetPassword", {
        userID: payload.userID,
        newPassword: payload.newPassword
      })
      .then(res => {
        // console.log(res);
      })
      .catch(error => console.log(error => console.log(error)));
  }
};

const mutations = {
  SET_UPDATE_DEVICE(state, payload) {
    // console.log("update");
    state.deviceList.map(device => {
      if (device.deviceID === payload.deviceID) {
        device.deviceID = payload.deviceID;
        device.name = payload.name;
        device.imei = payload.imei;
        device.currentTemp = payload.currentTemp;
        device.maxTemp = payload.maxTemp;
        device.minTemp = payload.minTemp;
        device.sendLine = payload.sendLine;
        device.userID = payload.userID;
        device.isEnabled = payload.isEnabled;
      }
    });
  },
  SET_UPDATE_USER(state, payload) {
    // console.log("update");
    state.userData.map(user => {
      if (user.userID === payload.userID) {
        user.firstname = payload.firstname;
        user.lastname = payload.lastname;
        user.phone = payload.phone;
        user.user_enable = payload.user_enable;
      }
    });
  },
  SET_ADD_DEVICE_RESULT(state, payload) {
    state.addDeviceResult = payload;
  },
  SET_USER_LIST(state, payload) {
    state.userData = payload;
  },
  SET_USER_DEVICE(state, payload) {
    state.userData.map(user => {
      if (user.userID === payload.userID) {
        user.deviceID = payload.deviceID;
      }
    });
  },
  SET_DEVICETABLE_LOAD(state, status) {
    state.deviceTableLoading = status;
  },
  SET_DEVICE_LIST(state, devices) {
    state.deviceList = devices;
  },
  SET_USERLIST_ID(state, payload) {
    state.userListId.push(payload);
    // console.log(state.userListId);
  },
  CLEAR_USERLIST_ID(state) {
    state.userListId = [];
  },
  CHANGE_USER_ENABLED(state, payload) {
    // console.log(payload);
    state.userData.map(user => {
      if (user.id === payload.id) {
        user.userEnabled = payload.value;
      }
    });
    // state.userData.userEnabled = payload;
  },
  SET_SEARCH_RESULT(state, payload) {
    state.searchResult = payload;
  },
  CLEAR_SEARCH_RESULT(state) {
    state.searchResult = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
