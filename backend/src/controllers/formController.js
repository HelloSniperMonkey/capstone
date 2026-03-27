const FormTemplate = require("../models/FormTemplate");

const GEN_ADMIN_TEMPLATE_CODE = "gen-admin";
const GEN_ADMIN_VEHICLE_REQUISITION_CODE = "gen-admin-vehicle-requisition-transport";
const SECURITY_CAMPUS_LEAVE_FEMALE_CODE = "security-campus-leave-female";
const CC_LDAP_ACCOUNT_REQUEST_CODE = "cc-ldap-account-request";

const GEN_ADMIN_TEMPLATE = {
  code: GEN_ADMIN_TEMPLATE_CODE,
  title: "General Administration Self-Declaration",
  description: "A self-declaration form for general administration purposes.",
  section: "genadmin",
  fields: [
    { label: "Salutation", name: "salutation", type: "select", required: true, options: ["Dr.", "Mr.", "Ms."] },
    { label: "Full Name", name: "fullName", type: "text", required: true },
    { label: "Designation", name: "designation", type: "text", required: true },
    { label: "Dept./Section/Centre", name: "department", type: "text", required: true },
    { label: "Employee Signature Name", name: "employeeSignatureName", type: "text", required: true },
    { label: "Employee Number", name: "empNo", type: "text", required: true },
    { label: "Place", name: "place", type: "text", required: true },
    { label: "Date", name: "declarationDate", type: "date", required: true },
  ],
  approvalStages: [],
};

const GEN_ADMIN_VEHICLE_REQUISITION_TEMPLATE = {
  code: GEN_ADMIN_VEHICLE_REQUISITION_CODE,
  title: "Indent for Transport",
  description: "General Administration vehicle requisition form for transport requirement.",
  section: "genadmin",
  fields: [
    { label: "Ref No.", name: "refNo", type: "text", required: false },
    { label: "Dated", name: "dated", type: "date", required: false },
    {
      label: "Name, Designation & Dept./Section/Centre of the Indentor",
      name: "indentorDetails",
      type: "text",
      required: true,
    },
    { label: "Type of vehicle required", name: "vehicleTypeRequired", type: "text", required: true },
    { label: "Vehicle required on (date)", name: "vehicleRequiredDate", type: "date", required: true },
    { label: "Vehicle required at (place)", name: "vehicleRequiredPlace", type: "text", required: true },
    { label: "Vehicle required at (time)", name: "vehicleRequiredTime", type: "text", required: true },
    { label: "Vehicle required up to", name: "vehicleRequiredUpto", type: "text", required: true },
    { label: "Place(s) to be visited", name: "placesToBeVisited", type: "text", required: true },
    {
      label: "Name(s) of the guest(s) (if applicable)",
      name: "guestNames",
      type: "text",
      required: false,
    },
    { label: "Flight No./Train No.", name: "flightOrTrainNo", type: "text", required: false },
    {
      label: "Arrival / Departure time",
      name: "arrivalDepartureTime",
      type: "text",
      required: false,
    },
    {
      label: "Is it official",
      name: "isOfficial",
      type: "select",
      required: true,
      options: ["Yes", "No"],
    },
    { label: "Official purpose", name: "officialPurpose", type: "textarea", required: false },
    { label: "Date", name: "signatureDate", type: "date", required: true },
    { label: "Vehicle No. (office use)", name: "allottedVehicleNo", type: "text", required: false },
    { label: "Type (office use)", name: "allottedVehicleType", type: "text", required: false },
    { label: "Driver (office use)", name: "allottedDriver", type: "text", required: false },
    { label: "Driver report to", name: "driverReportTo", type: "text", required: false },
    { label: "Report date", name: "driverReportDate", type: "date", required: false },
    { label: "Report place", name: "driverReportPlace", type: "text", required: false },
    { label: "Report time", name: "driverReportTime", type: "text", required: false },
  ],
  approvalStages: [],
};

const SECURITY_CAMPUS_LEAVE_FEMALE_TEMPLATE = {
  code: SECURITY_CAMPUS_LEAVE_FEMALE_CODE,
  title: "Campus Leaving Permission after 10:00 PM (For Female Students)",
  description: "Permission form for female students leaving IIT Patna campus after 10:00 PM.",
  section: "security",
  fields: [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Roll No", name: "rollNo", type: "text", required: true },
    { label: "Hostel Name", name: "hostelName", type: "text", required: true },
    { label: "Gender", name: "gender", type: "text", required: false },
    { label: "Date of Leaving", name: "dateOfLeaving", type: "date", required: true },
    { label: "Reason for Leaving", name: "reasonForLeaving", type: "textarea", required: true },
    { label: "Companion 1 Name", name: "companion1Name", type: "text", required: false },
    { label: "Companion 1 Roll No", name: "companion1RollNo", type: "text", required: false },
    { label: "Companion 2 Name", name: "companion2Name", type: "text", required: false },
    { label: "Companion 2 Roll No", name: "companion2RollNo", type: "text", required: false },
  ],
  approvalStages: [],
};

const CC_LDAP_ACCOUNT_REQUEST_TEMPLATE = {
  code: CC_LDAP_ACCOUNT_REQUEST_CODE,
  title: "REQUEST / REQUISITION FORM (For LDAP Account)",
  description: "Computer Center request/requisition form for LDAP account creation (project staff/temporary staff).",
  section: "cc",
  fields: [
    { label: "Emp. ID/Project ID", name: "empIdProjectId", type: "text", required: true },
    { label: "Full Name", name: "fullName", type: "text", required: true },
    { label: "Dept./Section/Centre", name: "department", type: "text", required: true },
    { label: "Phone/Mobile No.", name: "phoneMobileNo", type: "text", required: true },
    { label: "Personal Email-ID", name: "personalEmailId", type: "text", required: true },
    { label: "Address", name: "address", type: "textarea", required: true },
    { label: "IITP Email id (If any)", name: "iitpEmailId", type: "text", required: false },
    { label: "Validity date / Last Date for LDAP account", name: "validityLastDate", type: "date", required: true },
    { label: "Date", name: "requestDate", type: "date", required: true },
  ],
  approvalStages: [],
};

const getGenAdminTemplate = async (req, res) => {
  try {
    let template = await FormTemplate.findOne({ code: GEN_ADMIN_TEMPLATE_CODE });

    if (!template) {
      template = await FormTemplate.create({
        ...GEN_ADMIN_TEMPLATE,
        createdBy: req.user.id,
      });
    }

    return res.json(template);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to load general administration self declaration template" });
  }
};

const getGenAdminVehicleRequisitionTemplate = async (req, res) => {
  try {
    let template = await FormTemplate.findOne({ code: GEN_ADMIN_VEHICLE_REQUISITION_CODE });

    if (!template) {
      template = await FormTemplate.create({
        ...GEN_ADMIN_VEHICLE_REQUISITION_TEMPLATE,
        createdBy: req.user.id,
      });
    }

    return res.json(template);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to load general administration vehicle requisition template" });
  }
};

const getSecurityCampusLeaveTemplate = async (req, res) => {
  try {
    let template = await FormTemplate.findOne({ code: SECURITY_CAMPUS_LEAVE_FEMALE_CODE });

    if (!template) {
      template = await FormTemplate.create({
        ...SECURITY_CAMPUS_LEAVE_FEMALE_TEMPLATE,
        createdBy: req.user.id,
      });
    }

    return res.json(template);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to load security campus leave template" });
  }
};

const getComputerCenterLdapAccountRequestTemplate = async (req, res) => {
  try {
    let template = await FormTemplate.findOne({ code: CC_LDAP_ACCOUNT_REQUEST_CODE });

    if (!template) {
      template = await FormTemplate.create({
        ...CC_LDAP_ACCOUNT_REQUEST_TEMPLATE,
        createdBy: req.user.id,
      });
    }

    return res.json(template);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to load computer center LDAP account request template" });
  }
};

// @desc Create new form template
const createTemplate = async (req, res) => {
  try {
    const { title, description, fields, approvalStages } = req.body;

    if (!title || !fields || fields.length === 0) {
      return res.status(400).json({ message: "Title and fields required" });
    }

    const template = await FormTemplate.create({
      title,
      description,
      fields,
      approvalStages: Array.isArray(approvalStages) ? approvalStages : [],
      createdBy: req.user.id,
    });

    res.status(201).json(template);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create template" });
  }
};

// @desc Get all templates
const getAllTemplates = async (req, res) => {
  try {
    // Ensure Gen Admin template exists
    let genAdminTemplate = await FormTemplate.findOne({ code: GEN_ADMIN_TEMPLATE_CODE });
    if (!genAdminTemplate) {
      genAdminTemplate = await FormTemplate.create({
        ...GEN_ADMIN_TEMPLATE,
        createdBy: req.user?.id || null,
      });
    }

    // Ensure Security Campus Leave (Female) template exists
    let securityCampusLeaveTemplate = await FormTemplate.findOne({ code: SECURITY_CAMPUS_LEAVE_FEMALE_CODE });
    if (!securityCampusLeaveTemplate) {
      await FormTemplate.create({
        ...SECURITY_CAMPUS_LEAVE_FEMALE_TEMPLATE,
        createdBy: req.user?.id || null,
      });
    }

    // Ensure Computer Center LDAP account request template exists
    let ccLdapTemplate = await FormTemplate.findOne({ code: CC_LDAP_ACCOUNT_REQUEST_CODE });
    if (!ccLdapTemplate) {
      await FormTemplate.create({
        ...CC_LDAP_ACCOUNT_REQUEST_TEMPLATE,
        createdBy: req.user?.id || null,
      });
    }

    // Ensure General Administration vehicle requisition template exists
    let genAdminVehicleRequisitionTemplate = await FormTemplate.findOne({ code: GEN_ADMIN_VEHICLE_REQUISITION_CODE });
    if (!genAdminVehicleRequisitionTemplate) {
      await FormTemplate.create({
        ...GEN_ADMIN_VEHICLE_REQUISITION_TEMPLATE,
        createdBy: req.user?.id || null,
      });
    }

    const templates = await FormTemplate.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(templates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch templates" });
  }
};

// @desc Get templates created by current user
const getMyTemplates = async (req, res) => {
  try {
    const templates = await FormTemplate.find({
      createdBy: req.user.id, // changed here
    }).sort({ createdAt: -1 });

    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user templates" });
  }
};

module.exports = {
  createTemplate,
  getAllTemplates,
  getMyTemplates,
  getGenAdminTemplate,
  getGenAdminVehicleRequisitionTemplate,
  getSecurityCampusLeaveTemplate,
  getComputerCenterLdapAccountRequestTemplate,
};