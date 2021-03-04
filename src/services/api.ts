import users from '../users.json'

import { User } from '../contexts/auth';

interface Response {
  data: {
    user: {
      name: string;
      email: string;
    };
    token: string;
  };
}

export function post(text: string, data: User): Promise<Response> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data);
      const user = users.find(u => u.email === data.email && u.password === data.password)

      if(!user){
        reject('Email ou senha Inválidos');
        return ;
      }
      resolve({
        data: {
          token:
            btoa(`${user.name}:${user.email}`),
          user: {
            name: user.name,
            email: user.email,
          },
        },
      });
    }, 1000);
  });
}

export const defaults = {
  headers: {
    Authorization: '',
  },
};