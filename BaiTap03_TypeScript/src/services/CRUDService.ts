import bcrypt from 'bcryptjs'; // import thư viện bcryptjs
import db from '../models/index.ts'; // import database

const salt = bcrypt.genSaltSync(10); // tạo salt để hash password

// // Định nghĩa kiểu dữ liệu cho dữ liệu người dùng
// interface UserData {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   address: string;
//   phoneNumber: string;
//   gender: string; // '1' cho nam, giá trị khác cho nữ
//   roleId: string;
// }

// Hàm tạo user mới
let createNewUser = async (data): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === '1' ? true : false,
        roleId: data.roleId,
      });

      resolve('OK, create a new user successfully');
    } catch (error) {
      reject(error);
    }
  });
};

// Hàm hash password
let hashUserPassword = (password: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync("B4c0/\/", salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

// Lấy tất cả người dùng
let getAllUser = (): Promise<any[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true, // lấy dữ liệu gốc
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

// Lấy thông tin người dùng theo ID
let getUserInfoById = (userId: number): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Cập nhật thông tin người dùng
interface UpdateUserData {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
}

let updateUser = (data: UpdateUserData): Promise<any[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();

        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Xóa người dùng theo ID
let deleteUserById = async (userId: number): Promise<{ message: string }> => {
  try {
    let user = await db.User.findOne({
      where: { id: userId },
    });

    if (user) {
      await user.destroy();
      return { message: 'Xóa user thành công' };
    } else {
      return { message: 'Không tìm thấy user' };
    }
  } catch (e) {
    throw e;
  }
};

// Xuất hàm ra ngoài
export {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUser,
  deleteUserById,
};