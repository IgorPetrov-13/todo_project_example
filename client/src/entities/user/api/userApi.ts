import axiosInstance from '../../../services/axiosInstance';
import type {
  TypeUserAuthorization,
  TypeUserRegistration,
  TypeUserWithAccessToken,
} from '../types/userTypes';

class UserApi {
  static async getUserByRegistration(data: TypeUserRegistration): Promise<TypeUserWithAccessToken> {
    const response = await axiosInstance.post<TypeUserWithAccessToken>('/auth/registration', data);
    return response.data;
  }

  static async getUserByAuthorization(
    currUser: TypeUserAuthorization,
  ): Promise<TypeUserWithAccessToken> {
    const response = await axiosInstance.post<TypeUserWithAccessToken>(
      '/auth/authorization',
      currUser,
    );
    return response.data;
  }

  static async logoutUser(): Promise<TypeUserWithAccessToken> {
    const response = await axiosInstance.delete<TypeUserWithAccessToken>('/auth/logout');
    return response.data;
  }

  static async getUserByRefreshToken(): Promise<TypeUserWithAccessToken> {
    const response = await axiosInstance.get<TypeUserWithAccessToken>('/tokens/refresh');
    return response.data;
  }
}

export default UserApi;
