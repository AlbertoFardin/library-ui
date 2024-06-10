import { configure } from "enzyme";

const mediaDevices = {
  matches: false,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
  getSupportedConstraints: () => ({
    width: true,
    height: true,
    aspectRatio: true,
    frameRate: true,
    facingMode: true,
    resizeMode: true,
    sampleRate: true,
    sampleSize: true,
    echoCancellation: true,
    autoGainControl: true,
    noiseSuppression: true,
    latency: true,
    channelCount: true,
    deviceId: true,
    groupId: true,
  }),
};

global.navigator.mediaDevices = mediaDevices;

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

navigator.__defineGetter__("userAgent", () => {
  return "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"; // customized user agent
});

navigator.userAgent;

configure({});
