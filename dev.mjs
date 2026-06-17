import os from "os";
import { execSync } from "child_process";

// Get the real local network IP
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if ((iface.family === "IPv4" || iface.family === 4) && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

const ip = getLocalIP();
const networkUrl = `http://${ip}:3000`;

console.log("");
console.log("═══════════════════════════════════════════════");
console.log(`  🌐 Network URL:  ${networkUrl}`);
console.log("  📱 Open this on your phone or other devices");
console.log("═══════════════════════════════════════════════");
console.log("");

// Run Next.js dev server (inherits stdio so output streams through)
try {
  execSync("npx next dev --turbopack -H 0.0.0.0", {
    stdio: "inherit",
    cwd: process.cwd(),
  });
} catch {
  // Server was stopped (Ctrl+C), exit gracefully
}
