import { App } from "./class/App";
import { Tweet } from "./class/Tweet";
import { User } from "./class/User";

const app = new App(); //fará validação de usernames

const joanna = new User("Joanna", "joanna", "joanna@teste.com", "senha123"); //criar user
app.registerUser(joanna); //validar/registrar no database
const joao = new User("João", "joao", "joao@teste.com", "senha123");
app.registerUser(joao);
const testeUser = new User("José", "joao", "jose@teste.com", "senha123"); //erro ao tentar criar um username repetido
app.registerUser(testeUser);
const jose = new User("José", "jose", "jose@teste.com", "senha123");
app.registerUser(jose);
const teresa = new User("Teresa", "teresa", "te@teste.com", "senha123");
app.registerUser(teresa);

const tweet1 = new Tweet(joanna, "Hello World", "tweet"); //criar o tweet, tipo tweet
joanna.sendTweet(tweet1); //fazer tweet
tweet1.like(joao); //like no tweet
tweet1.like(joanna); //erro ao tentar curtir o próprio conteúdo
jose.follow(joanna); //follow
jose.follow(joanna); //na segunda vez deixa de seguir
tweet1.reply(joao, "E aí, beleza?"); //reply
tweet1.like(jose); //curte
tweet1.like(jose); //na segunda vez, descurte
joanna.follow(jose);
tweet1.reply(jose, "Adorei o conteúdo!");
tweet1.like(jose);
teresa.follow(joanna); //segue
const tweet2 = new Tweet(jose, "Iniciando no GrowTweet", "tweet");
jose.sendTweet(tweet2);
joanna.sendTweet(tweet2); //erro ao tentar publicar o tweet de outro user
tweet2.reply(joao, "uhuu"); //reply de usuário não seguido
const tweet3 = new Tweet(joanna, "Bem-vindos!", "tweet");
joanna.sendTweet(tweet3);

joanna.showTweets(); //mostra os tweets do usuário
joanna.showFeed(); //mostra o feed
