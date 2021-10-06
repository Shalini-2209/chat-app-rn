import AsyncStorage from "@react-native-community/async-storage";

const LogOut = ({ checkUser }) => {
  AsyncStorage.removeItem("user");
  checkUser();
  return null;
};

export default LogOut;
