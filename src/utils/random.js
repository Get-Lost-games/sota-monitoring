export const random = (length) => Math.floor(Math.random() * (length + 1));

function dec2hex(dec) {
  return dec.toString(16).padStart(2, "0");
}

export const randomString = (len) => {
  var arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
};

export const maybe = (prob) => {
  if (Math.floor(Math.random() * prob) === 1) return true;
  return false;
};

export const randomItem = (items) =>
  items[Math.floor(Math.random() * items.length)];

export const setRandomInterval = (intervalFunction, minDelay, maxDelay) => {
  let timeout;

  const runInterval = () => {
    const timeoutFunction = () => {
      intervalFunction();
      runInterval();
    };

    const delay =
      Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    timeout = setTimeout(timeoutFunction, delay);
  };

  runInterval();

  return {
    clear() {
      clearTimeout(timeout);
    },
  };
};
