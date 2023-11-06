// CAPA DE PERSISTENCIA 1

export default class User {
    static users = [];
  async registerModel(data) {
    User.users.push(data);
    return {
      message: "user registered!",
      response: { user_id: data._id },
    };
  }
  loginModel(user) {
    return {
      message: "user logged in!",
      response: { user },
    };
  }
  logoutModel() {
    return {
      message: "user signed out!",
      response: null,
    };
  }
  readUserModel() {
    let all = User.users;
    if (all.length > 0) {
      return {
        message: "users found!",
        response: { users: all },
      };
    } else {
      return null;
    }
  }
  readOneUserModel(mail) {
    let one = User.users.find((each) => each.mail === mail);
    if (one) {
      return {
        message: "user found!",
        response: one,
      };
    } else {
      return null;
    }
  }
  readByIdModel(id) {
    let one = User.users.find((each) => each._id === id);
    if (one) {
      return {
        message: "user found!",
        response: one,
      };
    } else {
      return null;
    }
  }
  async updateUserModel(mail, data) {
    try {
      let one = User.users.find((each) => each.mail === mail);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        return {
          message: "user updated!",
          response: one,
        };
      } else {
        return null;
      }
    } catch (error) {
      return error;
    }
  }
  async destroyUserModel(mail) {
    try {
      let one = User.users.find((each) => each.mail === mail);
      if (one) {
        User.users = User.users.filter((each) => each.mail !== mail);
        users = User.users.filter((each) => each.mail !== mail);
        return {
          message: "user destroyed!",
          response: one,
        };
      } else {
        return null;
      }
    } catch (error) {
      return false;
    }
  }
}