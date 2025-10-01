// utils/getDeviceInfo.js
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export async function getDeviceInfo() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();

  return {
    deviceId: result.visitorId,
    browser: `${navigator.userAgentData?.brands?.[0]?.brand || "Unknown"} ${navigator.userAgentData?.brands?.[0]?.version || "?"}`,
    os: navigator.userAgentData?.platform || navigator?.platform || "Unknown",
    screen: `${window.screen.width}x${window.screen.height}`,
    platform: navigator?.platform || "Unknown",
  };
}