"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function VendorForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [phone, setPhone] = useState("");

  const validate = (formData) => {
    const e = {};
    const getVal = (key) => formData.get(key) || "";

    if (!getVal("company_name").trim()) e.company_name = "Company Name is required";
    if (!getVal("typeOfFirm")) e.typeOfFirm = "Type of Firm is required";
    if (!getVal("statusOfCompany")) e.statusOfCompany = "Status of Company is required";
    if (!getVal("country")) e.country = "Country is required";
    if (!getVal("address").trim()) e.address = "Address is required";
    if (!getVal("city").trim()) e.city = "City is required";
    if (!getVal("state").trim()) e.state = "State is required";

    const pin = getVal("pin").trim();
    if (!pin) e.pin = "PIN Code is required";
    else if (!/^\d{4,10}$/.test(pin)) e.pin = "Enter a valid PIN Code";

    const email = getVal("email").trim();
    if (!email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";

    // phone is controlled via state, not FormData
    if (!phone || phone.trim().length < 7) e.phone = "Mobile Number is required";
    else if (!/^[\d\s\-().+]{7,20}$/.test(phone)) e.phone = "Enter a valid phone number";

    if (!getVal("contact_person").trim()) e.contact_person = "Contact Person is required";

    const purposes = formData.getAll("purpose");
    if (purposes.length === 0) e.purpose = "Select at least one option";

    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    // Inject the controlled phone value (with country code) into formData
    formData.set("phone", phone ? `+${phone}` : "");

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }
    setErrors({});

    // Handle Multi-select checkboxes for "Purpose"
    const selectedPurposes = formData.getAll("purpose").join(", ");

    const formDataBody = new URLSearchParams();

    // MUST match the Tab Name in your Google Sheet exactly
    formDataBody.append("formName", "Vendor Form");

    // Mapping to Google Sheet headers
    formDataBody.append("Timestamp", new Date().toLocaleString());
    formDataBody.append("Company Name", formData.get("company_name") || "");
    formDataBody.append("Firm Type", formData.get("typeOfFirm") || "");
    formDataBody.append("Status", formData.get("statusOfCompany") || "");
    formDataBody.append("Country", formData.get("country") || "");
    formDataBody.append("GST No", formData.get("gst") || "");
    formDataBody.append("PAN No", formData.get("pan") || "");
    formDataBody.append("Address", formData.get("address") || "");
    formDataBody.append("City", formData.get("city") || "");
    formDataBody.append("State", formData.get("state") || "");
    formDataBody.append("PIN Code", formData.get("pin") || "");
    formDataBody.append("Email", formData.get("email") || "");
    formDataBody.append("Phone", formData.get("phone") || "");
    formDataBody.append("Contact Person Name", formData.get("contact_person") || "");
    formDataBody.append("Designation", formData.get("designation") || "");
    formDataBody.append("MSME(Yes/No)", formData.get("msme") || "");
    formDataBody.append("URL", formData.get("website") || "");
    formDataBody.append("Interested Item Type", selectedPurposes);
    formDataBody.append("Company Description", formData.get("description") || "");

    try {
      const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
      if (!scriptURL) {
        throw new Error("Google Sheet URL is not configured.");
      }

      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formDataBody.toString()
      });

      alert('Vendor registration submitted successfully!');
      form.reset();
      setPhone("");
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container bandicoot-form-section mx-auto"
      style={{ background: "transparent" }}
      id="enquiry_form"
    >
      <div className="container">
        <div className="form_title">
          <h1 className="text-white text-[40px]">Vendor Registration Form</h1>
          <p className="text-white text-center w-fit">
            Register here to be a vendor with us.
          </p>
        </div>
        <br />
        <div className="bandicoot-form">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <label>
                  Company Name
                  <input type="text" name="company_name" placeholder="Company Name" className={errors.company_name ? "border border-red-500" : ""} required />
                </label>
                {errors.company_name && <p className="text-red-400 text-sm mt-1">{errors.company_name}</p>}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <label>
                  Type Of the Firm
                  <select name="typeOfFirm" id="typeOfFirm" defaultValue="" className={errors.typeOfFirm ? "border border-red-500" : ""}>
                    <option value="" disabled>
                      Select Type
                    </option>
                    <option>Public Limited Co</option>
                    <option>Partnership Co</option>
                    <option>Proprietorship</option>
                    <option>Govt. Sector</option>
                    <option>Other</option>
                  </select>
                </label>
                {errors.typeOfFirm && <p className="text-red-400 text-sm mt-1">{errors.typeOfFirm}</p>}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <label>
                  Status Of Company
                  <select name="statusOfCompany" id="statusOfCompany" defaultValue="" className={errors.statusOfCompany ? "border border-red-500" : ""}>
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option>MANUFACTURER</option>
                    <option>AUTHORISED DEALER</option>
                    <option>STOCKIST/TRADER</option>
                    <option>IMPORTER/INDIAN AGENT</option>
                    <option>SERVICE PROVIDER</option>
                  </select>
                </label>
                {errors.statusOfCompany && <p className="text-red-400 text-sm mt-1">{errors.statusOfCompany}</p>}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <label>
                  Country
                  <select name="country" id="country" defaultValue="" className={errors.country ? "border border-red-500" : ""}>
                    <option value="" disabled>
                      Select Country
                    </option>
                    <option>India</option>
                    <option>UAE</option>
                    <option>Other</option>
                  </select>
                </label>
                {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country}</p>}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <label>
                  GST No
                  <input type="text" name="gst" placeholder="GST Number" />
                </label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <label>
                  Pan No
                  <input type="text" name="pan" placeholder="Pan Number" />
                </label>
              </div>
            </div>
            <hr />
            <fieldset>
              <legend className="sr-only">Address</legend>
              <label>
                Address
                <textarea name="address" placeholder="Company Address" className={errors.address ? "border border-red-500" : ""} />
              </label>
              {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}

              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    City
                    <input type="text" name="city" placeholder="City" className={errors.city ? "border border-red-500" : ""} />
                  </label>
                  {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    State
                    <input type="text" name="state" placeholder="State" className={errors.state ? "border border-red-500" : ""} />
                  </label>
                  {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Postcode
                    <input
                      type="text"
                      name="pin"
                      placeholder="PIN Code"
                      className={errors.pin ? "border border-red-500" : ""}
                      required
                    />
                  </label>
                  {errors.pin && <p className="text-red-400 text-sm mt-1">{errors.pin}</p>}
                </div>
              </div>
            </fieldset>
            <hr />
            <fieldset>
              <legend className="sr-only">Contact information</legend>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Email Address
                    <input type="email" name="email" placeholder="Email" className={errors.email ? "border border-red-500" : ""} required />
                  </label>
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>Contact Number*</label>
                  <PhoneInput
                    country={"in"}
                    value={phone}
                    onChange={(value) => setPhone(value)}
                    inputProps={{
                      name: "phone",
                      required: true,
                    }}
                    containerStyle={{ width: "100%" }}
                    inputStyle={{
                      width: "100%",
                      background: "transparent",
                      color: "inherit",
                      border: errors.phone ? "1px solid #f87171" : undefined,
                    }}
                    buttonStyle={{
                      background: "transparent",
                    }}
                    enableSearch
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Contact Person
                    <input
                      type="text"
                      name="contact_person"
                      placeholder="Name of the Contact Person"
                      className={errors.contact_person ? "border border-red-500" : ""}
                      required
                    />
                  </label>
                  {errors.contact_person && <p className="text-red-400 text-sm mt-1">{errors.contact_person}</p>}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Designation
                    <input
                      type="text"
                      name="designation"
                      placeholder="Designation of the Contact Person"
                    />
                  </label>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Is your Firm MSME ?
                    <select name="msme" id="msme" defaultValue="No">
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </label>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Website
                    <input
                      type="text"
                      name="website"
                      placeholder="Website URL"
                    />
                  </label>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend>Type of Items Interested for Supply/service*</legend>
              <p className="sr-only">Select all that apply</p>
              {errors.purpose && <p className="text-red-400 text-sm mb-2">{errors.purpose}</p>}
              <div className="checkbox_item">
                <label>
                  <input type="checkbox" name="purpose" value="Capital Item" />
                  <span className="pt-2">Capital Item</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="ABRASIVES"
                  />
                  <span className="pt-2">ABRASIVES</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="AUTOMOTIVE CONSUMABLES"
                  />
                  <span className="pt-2">AUTOMOTIVE CONSUMABLES</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="BEARING,BUSHINGS AND BELTS"
                  />
                  <span className="pt-2">BEARING,BUSHINGS AND BELTS</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="BUILDING MATERIALS"
                  />
                  <span className="pt-2">BUILDING MATERIALS</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="DRILLING ACCESSORIES"
                  />
                  <span className="pt-2">DRILLING ACCESSORIES</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="CHEMICALS,GASES AND LUBRICANTS"
                  />
                  <span className="pt-2">CHEMICALS,GASES AND LUBRICANTS</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="COMMISSARY AND JANITORIAL"
                  />
                  <span className="pt-2">COMMISSARY AND JANITORIAL</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="ELECT.& ELECTRONIC COMPONENTS"
                  />
                  <span className="pt-2">ELECT.& ELECTRONIC COMPONENTS</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="ENAMELS,PAINTS,VARNISHES"
                  />
                  <span className="pt-2">ENAMELS,PAINTS,VARNISHES</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="EXPLOSIVES"
                  />
                  <span className="pt-2">EXPLOSIVES</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="FASTNERS & HARDWARE"
                  />
                  <span className="pt-2">FASTNERS & HARDWARE</span>
                </label>
              </div>
            </fieldset>
            <br />
            <label>
              Brief Description of Business of your Company
              <textarea
                name="description"
                placeholder="Brief description..."
              />
            </label>

            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VendorForm;

