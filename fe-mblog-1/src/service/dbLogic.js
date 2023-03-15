import axios from "axios";

export const jsonMemberListDB = (member) => {
    return new Promise((resolve, reject) => {
      try {
        const response = axios({
          method: "get",
          url: process.env.REACT_APP_SPRING_IP + "member/jsonMemberList",
          params: member,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };
