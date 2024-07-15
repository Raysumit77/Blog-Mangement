import instance from "../utils/api";

import { URLS } from "../constants";

const getMyProfile = () => {
  return instance.get(URLS.GET_MY_PROFILE, {
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });
};

const updateMyProfile = (payload) => {
  return instance.put(URLS.UPDATE_MY_PROFILE, {
    payload,
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });
};

const changePassword = (payload) => {
  return instance.post(URLS.CHANGE_PASSWORD, payload, {
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });
};

const UserServices = {
  getMyProfile,
  updateMyProfile,
  changePassword,
};

export default UserServices;
