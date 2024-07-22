const {Routes} = Modules;
declare type StackScreen = {
  [Routes.LOGIN]: undefined;
  [Routes.REGISTER]: IUserSignUpProp;
  [Routes.HOME]: undefined;
  [Routes.EDIT_USER]: undefined;
  [Routes.HISTORIC_CLIENT]: undefined;
  [Routes.CONFIGURATION]: undefined;
  // [Routes.EDIT_ARTIGO]: IEditArtigoDto;
};
