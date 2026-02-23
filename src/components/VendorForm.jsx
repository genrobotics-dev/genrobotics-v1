"use client";
import React, { useState } from "react";

function VendorForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

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
                  <input type="text" name="company_name" placeholder="Company Name" required />
                </label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <label>
                  Type Of the Firm
                  <select name="typeOfFirm" id="typeOfFirm" defaultValue="">
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
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <label>
                  Status Of Company
                  <select name="statusOfCompany" id="statusOfCompany" defaultValue="">
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
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <label>
                  Country
                  <select name="country" id="country" defaultValue="">
                    <option value="" disabled>
                      Select Country
                    </option>
                    <option>India</option>
                    <option>UAE</option>
                    <option>Other</option>
                  </select>
                </label>
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
                <textarea name="address" placeholder="Company Address" />
              </label>

              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    City
                    <input type="text" name="city" placeholder="City" />
                  </label>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    State
                    <input type="text" name="state" placeholder="State" />
                  </label>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Postcode
                    <input
                      type="text"
                      name="pin"
                      placeholder="PIN Code"
                      required
                    />
                  </label>
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
                    <input type="email" name="email" placeholder="Email" required />
                  </label>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Mobile Number
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Mobile Number"
                      required
                    />
                  </label>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Contact Person
                    <input
                      type="text"
                      name="contact_person"
                      placeholder="Name of the Contact Person"
                      required
                    />
                  </label>
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

