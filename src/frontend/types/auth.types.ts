export interface LoginData {
  username: string,
  password: string
}

export interface SignupData {
  username: string,
  password: string,
  confirmPassword: string,
  avatar_url: string
}

export interface AuthResponse {
  token: string,
  user : {
    id: number,
    username: string,
  }
}