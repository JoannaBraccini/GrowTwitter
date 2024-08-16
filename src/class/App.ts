import { users } from "../database/users";
import { User } from "./User";

export class App {
  public registerUser(user: User) {
    const usernameTaken = users.find(
      (regUser) => regUser.username === user.username
    );
    if (usernameTaken) {
      console.log(
        `Nome de usuário @${user.username} já está em uso. Por favor, escolha outro.\n`
      );
      return;
    } else {
      users.push(user);
      console.log(
        `Bem vindo(a), ${user.name}! Usuário cadastrado com sucesso!\n`
      );
    }
  }
}
