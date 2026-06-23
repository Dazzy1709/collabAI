export interface LoginData {
  name: string,
  password: string
}

export interface SignupData {
  name: string,
  password: string,
  confirmPassword: string,
  avatar_url: string
}

export interface AuthResponse {
  token: string,
  user : {
    id: number,
    name: string,
  }
}