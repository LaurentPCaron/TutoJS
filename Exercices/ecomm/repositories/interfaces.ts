interface IRepos {
  [key: string]: any;
  id: string;
}

interface IUser extends IRepos {
  [key: string]: any;
  id: string;
  email: String;
  password: string;
}

export { IUser, IRepos };
