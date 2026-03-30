const supabase = require("../lib/supabase");

async function createSensorData(req, res) {
  const { device_id: deviceId, temperature, humidity, gas, gas_resistance: gasResistance } = req.body;
  const normalizedGas = gas !== undefined ? gas : gasResistance;

  if (!deviceId || temperature === undefined || humidity === undefined || normalizedGas === undefined) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: device_id, temperature, humidity, gas (or gas_resistance), api_key."
    });
  }

  if (typeof deviceId !== "string" || !deviceId.trim()) {
    return res.status(400).json({
      success: false,
      message: "device_id must be a non-empty string."
    });
  }

  if (typeof temperature !== "number" || Number.isNaN(temperature)) {
    return res.status(400).json({
      success: false,
      message: "temperature must be a valid number."
    });
  }

  if (typeof humidity !== "number" || Number.isNaN(humidity)) {
    return res.status(400).json({
      success: false,
      message: "humidity must be a valid number."
    });
  }

  if (typeof normalizedGas !== "number" || Number.isNaN(normalizedGas)) {
    return res.status(400).json({
      success: false,
      message: "gas must be a valid number (or send gas_resistance as number)."
    });
  }

  const { data, error } = await supabase
    .from("sensor_data")
    .insert([
      {
        device_id: deviceId,
        temperature,
        humidity,
        gas: normalizedGas
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to store sensor data."
    });
  }

  return res.status(201).json({
    success: true,
    message: "Sensor data stored successfully.",
    data
  });
}

module.exports = {
  createSensorData
};
