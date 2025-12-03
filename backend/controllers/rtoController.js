import Vehicle from "../models/Vehicle.js";
import { fetchFromExternalAPI } from "../utils/externalApi.js";
import { checkInsuranceExpiration } from "../utils/dateComparison.js";
import { uppercaseRTO } from "../utils/uppercase.js";

export const checkRTO = async (req, res) => {
  try {
    const { rto } = req.query;

    if (!rto) return res.json({ data: { message: "RTO number is required." } });
    //RTO Number Formatting
    const number = uppercaseRTO(rto);

    //RTO Number Validation
    const pattern = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{1,4}$/;
    if (!pattern.test(number))
      return res.json({ data: { message: "Invalid RTO number." } });

    let vehicle = await Vehicle.findOne({ rtoNumber: number });

    // -----------------------------------------------
    // CASE 1: Data Found in DB
    // -----------------------------------------------
    if (vehicle) {
      const isExpired = checkInsuranceExpiration(
        vehicle.apiResponse.insuranceUpto
      );

      if (!isExpired) {
        // still valid → use cache
        return res.json({
          source: "cache-db",
          data: filterData(vehicle),
        });
      }

      // expired → fresh API call
      const freshData = await fetchFromExternalAPI(number);
      // Update DB
      await Vehicle.updateOne(
        { rtoNumber: number },
        { $set: { apiResponse: freshData } }
      );

      return res.json({
        source: "external-new-update",
        data: filterData(vehicle),
      });
    }

    // -----------------------------------------------
    // CASE 2: Not Found In DB → External API
    // -----------------------------------------------
    const apiData = await fetchFromExternalAPI(number);

    const newVehicle = await Vehicle.create({
      rtoNumber: number,
      apiResponse: apiData,
    });

    return res.json({
      source: "external-first-call",
      data: filterData(newVehicle),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// Filter before sending to frontend
function filterData(vehicle) {
  return {
    rtoNumber: vehicle.rtoNumber,
    owner: vehicle.apiResponse.owner,
    model: vehicle.apiResponse.makerModel,
    chassisNumber: vehicle.apiResponse.chassisNumber,
    engineNumber: vehicle.apiResponse.engineNumber,
    insuranceUpto: checkInsuranceExpiration(vehicle.apiResponse.insuranceUpto)
      ? "invalid"
      : "valid",
  };
}
