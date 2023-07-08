/* eslint-disable import/prefer-default-export */
function getUrlParam() {
  const { location } = window;
  const { search } = location;
  return decodeURIComponent(search.split('=')[1]);
}

export { getUrlParam };
