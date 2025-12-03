// import axios from "axios";
let count = 0;
export async function fetchFromExternalAPI(rtoNumber) {
  count++;
  console.log(count, rtoNumber);
  const d = {
    valid: true,
    status: "ACTIVE",
    registered: "19-10-2016",
    owner: "KRISHNA MURARI PRAJAPATI",
    masked: null,
    ownerNumber: "1",
    father: null,
    currentAddress:
      "50 PANDRIWA GALI HAMAM PER,KHAJEKALA PATNA CITY,PATNA,800008",
    permanentAddress:
      "50 PANDRIWA GALI HAMAM PER,KHAJEKALA PATNA CITY,PATNA,800008",
    mobile: null,
    category: "2WN",
    categoryDescription: "M-Cycle/Scooter(2WN)",
    chassisNumber: "ME4JF505JG7325661",
    engineNumber: "JF50E73324944",
    makerDescription: "HONDA MOTORCYCLE AND SCOOTER INDIA (P) LTD",
    makerModel: "ACTIVA 110 3G",
    makerVariant: null,
    bodyType: "MOTOR CYCLE (PRIVATE)",
    fuelType: "PETROL",
    colorType: "GREY",
    normsType: "BHARAT STAGE III",
    fitnessUpto: "18-10-2031",
    financed: false,
    lender: null,
    insuranceProvider: "ICICI Lombard General Insurance Co. Ltd.",
    insurancePolicyNumber: "3005/368519753/01/000",
    insuranceUpto: "14-11-2026",
    manufactured: "02/2016",
    rto: "PATNA, Bihar",
    cubicCapacity: "110.00",
    grossWeight: "0",
    wheelBase: "0",
    unladenWeight: "112",
    cylinders: "1",
    seatingCapacity: "2",
    sleepingCapacity: null,
    standingCapacity: "0",
    pollutionCertificateNumber: "BR00100450028868",
    pollutionCertificateUpto: "01-06-2025",
    permitNumber: null,
    permitIssued: null,
    permitFrom: null,
    permitUpto: null,
    permitType: null,
    taxUpto: "18-10-2031",
    taxPaidUpto: "18-10-2031",
    nationalPermitNumber: null,
    nationalPermitIssued: null,
    nationalPermitFrom: null,
    nationalPermitUpto: null,
    blacklistStatus: null,
    nocDetails: null,
    challanDetails: null,
    nationalPermitIssuedBy: null,
    commercial: false,
    exShowroomPrice: null,
    nonUseStatus: null,
    nonUseFrom: null,
    nonUseTo: null,
    blacklistDetails: null,
  };
  //   const url = `https://actual-api.com/verify?rto=${rtoNumber}`;

  //   const response = await axios.get(url);

  //   return response.data; // return complete response
  return d;
}
