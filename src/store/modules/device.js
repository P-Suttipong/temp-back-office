import axios from "axios";
const api = axios.create({
  baseURL: "http://103.7.57.141:8083/tempurature/web",
  headers: { crossdomain: true }
});

const state = {
  loginAt: parseInt(localStorage.loginAt),
  deviceTableLoading: false,
  deviceList: [
    {
      deviceID: "1",
      imei: "AAAAAAAAAAAAA",
      name: "DeviceName",
      currentTemp: "22.14",
      maxTemp: "10",
      minTemp: "-10",
      sendLine: false,
      userName: "-",
      isEnabled: true
    }
  ],
  userData: [
    {
      firstname: "Firstname",
      userName: "userName",
      lastname: "Lastname",
      userID: "1",
      phone: "1234567890",
      createAt: "12-12-20 16:41",
      lineKey: "-",
      deviceID: [
        {
          id: "1",
          name: "test"
        }
      ],
      user_enable: true
    }
  ],
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
    // await api
    //   .post("/login", {
    //     username: payload.username,
    //     password: payload.password
    //   })
    //   .then(res => {
    //     resData = res;
    //     let timeStamp = Date.parse(res.data.loginAt);
    //     localStorage.setItem(
    //       "user",
    //       JSON.stringify({
    //         username: payload.username
    //       })
    //     );
    //     localStorage.setItem("loginAt", timeStamp);
    //   })
    //   .catch(error => {
    //     console.log("Get Device List Error :", error.message);
    //     resData = error;
    //   });
    localStorage.setItem("user", "asdsad");
    return resData;
  },
  logout: async ({ commit }) => {
    await localStorage.removeItem("user");
    await localStorage.removeItem("loginAt");
    return true;
  },
  register: async ({ commit, state }, payload) => {
    api
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
        console.log(respone);
      })
      .catch(error => console.log("Register Error : ", error.message));
  },
  addDevice: async ({ commit, state }, payload) => {
    api
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
        console.log(res);
      })
      .catch(error => {
        console.log("ADD DEVICE ERROR :", error);
      });
  },
  updateDevice: async ({ commit, state }, payload) => {
    console.log(payload);
    api
      .put("/updateDevice", {
        deviceID: payload.deviceID,
        name: payload.deviceName,
        imei: payload.imei,
        currentTemp: payload.currentTemp,
        maxTemp: payload.maxTemp,
        minTemp: payload.minTemp,
        sendLine: payload.sendLine,
        userID: payload.userID,
        isEnabled: payload.isEnabled
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  },
  updateUser: async ({ commit, state }, payload) => {
    console.log(payload);
  },
  getDeviceList: async ({ commit, state }) => {
    commit("SET_DEVICETABLE_LOAD", true);
    // api
    //   .get("/deviceList")
    //   .then(res => {
    //     console.log(res);
    //     commit("SET_DEVICE_LIST", res.data);
    //     res.data.map(device => {
    //       if (device.userName !== "-") {
    //         commit("SET_USERLIST_ID", device.userName);
    //       }
    //     });
    //     commit("SET_USERLIST_ID", "Show All");
    //   })
    //   .catch(error => console.log("Get Device List Error :", error));
    commit("SET_DEVICETABLE_LOAD", false);
  },
  getUserList: async ({ commit, state }) => {
    // api
    //   .get("/userList")
    //   .then(res => {
    //     console.log(res);
    //     commit("SET_USER_LIST", res.data);
    //   })
    //   .catch(error => {
    //     console.log("Get User List Error :", error);
    //   });
  },
  addUserDevice: async ({ commit }, payload) => {
    await api
      .put("/addUserDevice", {
        userID: payload.userID,
        deviceID: payload.deviceID
      })
      .then(res => {
        console.log("add device", res);
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
        console.log("remove device", res);
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
        console.log(res);
        if (res.data) {
          commit("SET_SEARCH_RESULT", res.data);
        }
      })
      .catch(error => {
        console.log("searchDeviceByID Error : ", error);
      });
  }
};

const mutations = {
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
