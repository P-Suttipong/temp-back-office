import axios from "axios";
const api = axios.create({
  baseURL: "http://103.7.57.141:8083/tempurature/web",
  headers: { crossdomain: true }
});

const state = {
  loginAt: parseInt(localStorage.loginAt),
  deviceList: [],
  userData: [
    {
      id: "USER001",
      username: "user001",
      firstname: "John",
      lastname: "Yatch",
      phoneNumber: 123456789,
      userEnabled: true,
      lineKey: "XXX",
      deviceList: [{ name: "Device Name", id: "TEMP00001", handle: true }]
    },
    {
      id: "USER002",
      username: "user002",
      firstname: "Marine",
      lastname: "Hock",
      phoneNumber: 987654321,
      userEnabled: false,
      lineKey: "XXX",
      deviceList: [
        { name: "Device Name 2", id: "TEMP00002", handle: true },
        { name: "Device Name 3", id: "TEMP00003", handle: true }
      ]
    }
  ],
  userListId: []
};

const getters = {};

const actions = {
  login: async ({ commit }, payload) => {
    console.log(payload);
    let resData;
    await api
      .post("/login", {
        username: payload.username,
        password: payload.password
      })
      .then(res => {
        console.log(res.data);
        resData = res;
        let timeStamp = Date.parse(res.data.loginAt);
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: payload.username
          })
        );
        localStorage.setItem("loginAt", timeStamp);
      })
      .catch(error => {
        console.log("Get Device List Error :", error.message);
        resData = error;
      });
    return resData;
  },
  logout: async ({ commit }) => {
    await localStorage.removeItem("user");
    await localStorage.removeItem("loginAt");
    return true;
  },
  fetchUserListId: async ({ commit, state }) => {
    await commit("CLEAR_USERLIST_ID");
    await state.userData.map(user => {
      commit("SET_USERLIST_ID", user.id);
    });
    await commit("SET_USERLIST_ID", "Show All");
  },
  register: async ({ commit, state }, payload) => {
    console.log(payload);
    // api
    //   .post("/register", {
    //     username: payload.username,
    //     password: payload.password,
    //     firstname: payload.firstname,
    //     lastname: payload.lastname,
    //     phone: payload.phone,
    //     lineKey: payload.lineKey,
    //     deviceID: payload.deviceID
    //   })
    //   .then(respone => {
    //     console.log(respone);
    //   })
    //   .catch(error => console.log("Register Error : ", error.message));
  },
  getDeviceList: async ({ commit }) => {
    api
      .get("/deviceList")
      .then(res => {
        console.log(res);
        commit("SET_DEVICE_LIST", res.data);
      })
      .catch(error => console.log("Get Device List Error :", error.message));
  }
};

const mutations = {
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
