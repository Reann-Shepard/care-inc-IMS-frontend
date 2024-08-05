import { jwtDecode } from 'jwt-decode';
// import jwtDecode from 'jwt-decode';

interface JwtPayload {
  sub: string;
  name: string;
  roles: string;
}

export const getUserRoleFromToken = (token: string): string | null => {
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken.roles;
  } catch (error) {
    console.log('Invalid token:', error);
    return null;
  }
};
