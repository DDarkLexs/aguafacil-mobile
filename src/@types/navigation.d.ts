const {Routes} = Modules;
declare type StackScreen = {
  [Routes.LOGIN]: undefined;
  [Routes.REGISTER]: IUserSignUpProp;
  [Routes.CLIENT_HOME]: undefined;
  [Routes.CLIENT_SERVICE_AVAILABLE]: undefined;
  [Routes.CLIENT_USER_STACK]: undefined;
  [Routes.CLIENT_EDIT_USER]: undefined;
  [Routes.CLIENT_VIEW_USER]: undefined;
  [Routes.HISTORIC_CLIENT_SINGLE]: IServicoArchive;
  [Routes.HISTORIC_CLIENT]: undefined;
  [Routes.CLIENT_CONFIGURATION]: undefined;
  // [Routes.EDIT_ARTIGO]: IEditArtigoDto;
};
