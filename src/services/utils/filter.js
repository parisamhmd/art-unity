import _ from "lodash";
const filter = (data, keys, filter) => {
  let newData = data;
  newData = keys
    .split(",")
    .map((key) => data?.filter((item) => _.get(item, key).includes(filter)));
  return newData.reduce((acc, item) => [...acc, ...item], []);
};
export default filter;
