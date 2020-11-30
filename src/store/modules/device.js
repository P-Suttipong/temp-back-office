const state = {
  deviceData: [
    {
      deviceId: "TEMP00001",
      imei: "FA:FB:C5:94:AD",
      deviceName: "Device Name",
      currentTemp: 8,
      maxTemp: 10,
      minTemp: -10,
      sendLine: true,
      userId: "USER001",
      isEnable: false
    },
    {
      deviceId: "TEMP00002",
      imei: "FA:FB:C5:94:AD",
      deviceName: "Device Name",
      currentTemp: 1.5,
      maxTemp: 7,
      minTemp: -3,
      sendLine: false,
      userId: "USER002",
      isEnable: true
    }
  ],
  userData: [
    {
      id: "USER001",
      username: "user001",
      firstname: "John",
      lastname: "Yatch",
      phoneNumber: 123456789,
      userEnabled: true,
      lineKey: "XXX",
      deviceList: ["TEMP00001"]
    },
    {
      id: "USER002",
      username: "user002",
      firstname: "Marine",
      lastname: "Hock",
      phoneNumber: 987654321,
      userEnabled: false,
      lineKey: "XXX",
      deviceList: ["TEMP00002", "TEMP00003"]
    }
  ],
  userListId: []
};

const getters = {};

const actions = {
  fetchUserListId: async ({ commit, state }) => {
    await commit("CLEAR_USERLIST_ID");
    await state.userData.map(user => {
      commit("SET_USERLIST_ID", user.id);
    });
    await commit("SET_USERLIST_ID", "Show All");
  }
};

const mutations = {
  SET_USERLIST_ID(state, payload) {
    state.userListId.push(payload);
    console.log(state.userListId);
  },
  CLEAR_USERLIST_ID(state) {
    state.userListId = [];
  },
  CHANGE_USER_ENABLED(state, payload) {
    console.log(payload);
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
