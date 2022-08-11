import { API_DOMAIN } from "./constants";

const makeAPICall = async (
  errorCallback,
  successCallback,
  alwaysCallback = null,
  url = "/api/activity/list/"
) => {
  try {
    const res = await fetch(API_DOMAIN.concat(url));
    const json = await res.json();

    successCallback(json);
  } catch {
    errorCallback({
      active: true,
      title: "500",
      message: "Please reload the page",
    });
  }

  if (alwaysCallback) alwaysCallback();
};

export { makeAPICall };
