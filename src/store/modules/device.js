const state = {
  deviceData: [
    {
      deviceId: "TEMP00001",
      imei: "FA:FB:C5:94:AD",
      deviceName: "Device Name",
      currentTemp: 1.5,
      maxTemp: 7,
      minTemp: -3,
      sendLine: "Line",
      userId: "USER001"
    },
    {
      deviceId: "TEMP00002",
      imei: "FA:FB:C5:94:AD",
      deviceName: "Device Name",
      currentTemp: 1.5,
      maxTemp: 7,
      minTemp: -3,
      sendLine: "Line",
      userId: "USER002"
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
      lineKey: "XXX"
    },
    {
      id: "USER002",
      username: "user002",
      firstname: "Marine",
      lastname: "Hock",
      phoneNumber: 987654321,
      userEnabled: false,
      lineKey: "XXX"
    },
    {
      id: "USER003",
      username: "user001",
      firstname: "John",
      lastname: "Yatch",
      phoneNumber: 123456789,
      userEnabled: true,
      lineKey: "XXX"
    },
    {
      id: "USER004",
      username: "user002",
      firstname: "Marine",
      lastname: "Hock",
      phoneNumber: 987654321,
      userEnabled: false,
      lineKey: "XXX"
    },
    {
      id: "USER005",
      username: "user001",
      firstname: "John",
      lastname: "Yatch",
      phoneNumber: 123456789,
      userEnabled: true,
      lineKey: "XXX"
    },
    {
      id: "USER006",
      username: "user002",
      firstname: "Marine",
      lastname: "Hock",
      phoneNumber: 987654321,
      userEnabled: false,
      lineKey: "XXX"
    },
    {
      id: "USER007",
      username: "user001",
      firstname: "John",
      lastname: "Yatch",
      phoneNumber: 123456789,
      userEnabled: true,
      lineKey: "XXX"
    },
    {
      id: "USER008",
      username: "user002",
      firstname: "Marine",
      lastname: "Hock",
      phoneNumber: 987654321,
      userEnabled: false,
      lineKey: "XXX"
    }
  ],
  userListId: []
};

const getters = {};

const actions = {
  fetchUserListId: async ({ commit, state }) => {
    await commit("CLEAR_USERLIST_ID");
    await state.deviceData.map(device => {
      commit("SET_USERLIST_ID", device.userId);
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
