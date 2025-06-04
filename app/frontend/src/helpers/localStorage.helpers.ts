export function getToken(): string {
  const data = localStorage.getItem('token');
  const result = data ? JSON.parse(data) : '';

  return result;
}

export function setToken(token: string): void {
  localStorage.setItem('token', JSON.stringify(token));
}

export function removeToken(): void {
  localStorage.removeItem('token');
}