const NodeClam = require("clamscan");
const { Readable } = require("stream");

let clamScan;

const initializeClamAV = async () => {
    clamScan = await new NodeClam().init({
        clamdscan: {
            host: process.env.CLAMAV_HOST || "secureops-clamav",
            port: Number(process.env.CLAMAV_PORT) || 3310,
            timeout: 60000,
            localFallback: false
        },
        preference: "clamdscan"
    });

    console.log("ClamAV connected successfully");
};

const scanBuffer = async (buffer) => {
    if (!clamScan) {
        throw new Error("ClamAV is not initialized");
    }

    const stream = Readable.from(buffer);

    const result = await clamScan.scanStream(stream);

    return result;
};

module.exports = {
    initializeClamAV,
    scanBuffer
};