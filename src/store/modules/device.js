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
  userListId: []
};

const getters = {};

const actions = {
  fetchUserListId: async ({ commit, state }) => {
    await commit("CLEAR_USERLIST_ID");
    await state.deviceData.map(device => {
      commit("SET_USERLIST_ID", device.userId);
    });
    await commit("SET_USERLIST_ID", "แสดงทั้งหมด");
  }
};

const mutations = {
  SET_USERLIST_ID(state, payload) {
    state.userListId.push(payload);
    console.log(state.userListId);
  },
  CLEAR_USERLIST_ID(state) {
    state.userListId = [];
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
