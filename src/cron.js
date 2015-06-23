let schedule = (func, interval) => {
  func();
  return setInterval(func, interval);
}

export default {
  schedule
}
