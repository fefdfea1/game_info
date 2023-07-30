export const changeMode = (target: HTMLLIElement) => {
  if (target.classList.contains("dark")) {
    console.log(" 실행");
    target.classList.add("whiteMode");
    target.classList.remove("dark");
    changeWhiteMode();
  } else {
    console.log(" 실행");
    target.classList.remove("whiteMode");
    target.classList.add("dark");
    changeDarkMode();
  }
};

const changeDarkMode = () => {
  document.documentElement.style.setProperty("--backgroundColor", "#14161e");
  document.documentElement.style.setProperty("--colorGray", "#999");
  document.documentElement.style.setProperty("--darkGray", "#222222");
  document.documentElement.style.setProperty("--colorWhite", "#fff");
  document.documentElement.style.setProperty("--colorBlack", "black");
  document.documentElement.style.setProperty(
    "--searchBoxBackgroundColor",
    "#121212"
  );
  document.documentElement.style.setProperty(
    "--loginButtonBackgroundColor",
    "#04a4f0"
  );
  document.documentElement.style.setProperty("--searchBoxBorder", "#303030");
  document.documentElement.style.setProperty(
    "--loginButtonActiveBackgroundColor",
    "#04a4f9"
  );
  document.documentElement.style.setProperty(
    "--signUpBackgroundColor",
    "#b75379"
  );
  document.documentElement.style.setProperty(
    "--signUpActiveBackgroundColor",
    "#a04969"
  );
  document.documentElement.style.setProperty(
    "--signInBackgroundColor",
    "#0792d7"
  );
  document.documentElement.style.setProperty(
    "--userSearchFontColor",
    "#d8d9cf"
  );
  document.documentElement.style.setProperty(
    "--detailInfoTitleFontColor",
    "#3e4648"
  );
  document.documentElement.style.setProperty("--fontWhite", "#fff");
  document.documentElement.style.setProperty("--fontBlack", "black");
  document.documentElement.style.setProperty("--fontGray", "#999");
  document.documentElement.style.setProperty(
    "--SignInSignUpTitleFontColor",
    "#333"
  );
  document.documentElement.style.setProperty("--ScroeFontColor", "#6dc849");
};

const changeWhiteMode = () => {
  document.documentElement.style.setProperty("--backgroundColor", "#fff");
  document.documentElement.style.setProperty("--colorGray", "#999");
  document.documentElement.style.setProperty("--darkGray", "#222222");
  document.documentElement.style.setProperty("--colorWhite", "black");
  document.documentElement.style.setProperty("--colorBlack", "#fff");
  document.documentElement.style.setProperty(
    "--searchBoxBackgroundColor",
    "#999"
  );
  document.documentElement.style.setProperty("--searchBoxBorder", "#999");
  document.documentElement.style.setProperty(
    "--loginButtonBackgroundColor",
    "#04a4f0"
  );
  document.documentElement.style.setProperty(
    "--loginButtonActiveBackgroundColor",
    "#04a4f9"
  );
  document.documentElement.style.setProperty(
    "--signUpBackgroundColor",
    "#b75379"
  );
  document.documentElement.style.setProperty(
    "--userSearchFontColor",
    "#a04969"
  );
  document.documentElement.style.setProperty("--fontWhite", "black");
  document.documentElement.style.setProperty("--fontBlack", "#fff");
  document.documentElement.style.setProperty("--fontGray", "#0792d7");
  document.documentElement.style.setProperty(
    "--SignInSignUpTitleFontColor",
    "#fff"
  );
  document.documentElement.style.setProperty("--ScroeFontColor", "#0792d7");
};
