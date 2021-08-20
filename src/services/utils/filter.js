import _ from "lodash";
const filter = (data, keys, filter) => {
  let newData = data;
  newData = filter
    ? keys
        .split(",")
        .map((key) => data?.filter((item) => _.get(item, key).includes(filter)))
    : data;
  return [...new Set(newData?.reduce((acc, curr) => acc.concat(curr), []))];
};
export default filter;
