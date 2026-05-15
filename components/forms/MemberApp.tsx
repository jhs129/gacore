import React, { useState } from "react";
import { MembershipFormData } from "../../types/membership";

export const MemberApp: React.FC = () => {
  const [formData, setFormData] = useState<MembershipFormData>({
    // Contact Information
    firstName: "",
    mi: "",
    lastName: "",
    credentials: "",
    credentialsOther: "",
    email: "",
    workPhone: "",
    workFax: "",
    title: "",
    organization: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    zip: "",
    county: "",
    state: "",

    // Demographic Information
    sex: "",
    age: "",
    education: "",
    certifications: "",
    training: "",

    // Navigator/Program Details
    yearsAsNavigator: "",
    employmentStatus: "",
    positionType: "",
    services: [],
    cancerTypes: [],
    languages: [],
    includeInDirectory: false,

    // Security Information
    password: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/membership", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      setSubmitSuccess(true);

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Failed to submit application"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: "services" | "cancerTypes" | "languages"
  ) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [category]: checked
        ? [...prev[category], value]
        : prev[category].filter((item) => item !== value),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 font-sans">
      {submitSuccess ? (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center mb-2">
            <svg
              className="w-5 h-5 text-green-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <h4 className="text-lg font-semibold text-green-800">
              Application Submitted Successfully!
            </h4>
          </div>
          <p className="text-green-700">
            Thank you for submitting your membership application. We will review
            your information and contact you soon.
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl text-gray-700 mb-8">Contact Information</h2>

          <div className="flex mb-4 items-start">
            <label className="w-40 text-left pl-1 text-sm pt-2 shrink-0">
              Name<span className="text-red-500 ml-1">*</span>:
            </label>
            <div className="flex gap-2 w-[600px]">
              <input
                type="text"
                name="firstName"
                placeholder="First"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="flex-[2] p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="mi"
                placeholder="MI"
                value={formData.mi}
                onChange={handleInputChange}
                maxLength={1}
                className="w-16 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="flex-[2] p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="flex mb-4 items-start">
            <label className="w-40 text-left pl-1 text-sm pt-2 shrink-0">
              Credentials:
            </label>
            <div className="flex gap-4 w-[600px]">
              <select
                name="credentials"
                value={formData.credentials}
                onChange={handleInputChange}
                className="flex-1 p-2 border border-gray-300 rounded"
              >
                <option value="">Select one...</option>
                <option value="md">MD</option>
                <option value="rn">RN</option>
                <option value="msw">MSW</option>
              </select>
              <div className="flex items-center gap-2 flex-1">
                <span className="text-sm whitespace-nowrap">If Other:</span>
                <input
                  type="text"
                  name="credentialsOther"
                  value={formData.credentialsOther}
                  onChange={handleInputChange}
                  className="flex-1 p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          <div className="flex mb-4 items-start">
            <label className="w-40 text-left pl-1 text-sm pt-2 shrink-0">
              Email<span className="text-red-500 ml-1">*</span>:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-[600px] p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex mb-4 items-start">
            <label className="w-40 text-left pl-1 text-sm pt-2 shrink-0">
              Work/Mobile Phone<span className="text-red-500 ml-1">*</span>:
            </label>
            <input
              type="tel"
              name="workPhone"
              value={formData.workPhone}
              onChange={handleInputChange}
              required
              className="w-[600px] p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex mb-4 items-start">
            <label className="w-40 text-left pl-1 text-sm pt-2 shrink-0">
              Work Fax:
            </label>
            <input
              type="tel"
              name="workFax"
              value={formData.workFax}
              onChange={handleInputChange}
              className="w-[600px] p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex mb-4 items-start">
            <label className="w-40 text-left pl-1 text-sm pt-2 shrink-0">
              Title<span className="text-red-500 ml-1">*</span>:
            </label>
            <div className="flex flex-col gap-1 w-[600px]">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <span className="text-xs text-gray-600">
                For students, use "Student".
              </span>
            </div>
          </div>

          <div className="flex mb-4 items-start">
            <label className="w-40 text-left pl-1 text-sm pt-2 shrink-0">
              Organization / Institution
              <span className="text-red-500 ml-1">*</span>:
            </label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleInputChange}
              required
              className="w-[600px] p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex mb-4 items-start">
            <label className="w-40 text-left pl-1 text-sm pt-2 shrink-0">
              Address<span className="text-red-500 ml-1">*</span>:
            </label>
            <div className="flex flex-col gap-2 w-[548px]">
              <input
                type="text"
                name="addressLine1"
                placeholder="Address Line 1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="addressLine2"
                placeholder="Address Line 2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="p-2 border border-gray-300 rounded"
                />
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-24 p-2 border border-gray-300 rounded"
                >
                  <option value="">State</option>
                  <option value="AL">AL</option>
                  <option value="AK">AK</option>
                  <option value="AZ">AZ</option>
                  <option value="AR">AR</option>
                  <option value="CA">CA</option>
                  <option value="CO">CO</option>
                  <option value="CT">CT</option>
                  <option value="DE">DE</option>
                  <option value="FL">FL</option>
                  <option value="GA">GA</option>
                  <option value="HI">HI</option>
                  <option value="ID">ID</option>
                  <option value="IL">IL</option>
                  <option value="IN">IN</option>
                  <option value="IA">IA</option>
                  <option value="KS">KS</option>
                  <option value="KY">KY</option>
                  <option value="LA">LA</option>
                  <option value="ME">ME</option>
                  <option value="MD">MD</option>
                  <option value="MA">MA</option>
                  <option value="MI">MI</option>
                  <option value="MN">MN</option>
                  <option value="MS">MS</option>
                  <option value="MO">MO</option>
                  <option value="MT">MT</option>
                  <option value="NE">NE</option>
                  <option value="NV">NV</option>
                  <option value="NH">NH</option>
                  <option value="NJ">NJ</option>
                  <option value="NM">NM</option>
                  <option value="NY">NY</option>
                  <option value="NC">NC</option>
                  <option value="ND">ND</option>
                  <option value="OH">OH</option>
                  <option value="OK">OK</option>
                  <option value="OR">OR</option>
                  <option value="PA">PA</option>
                  <option value="RI">RI</option>
                  <option value="SC">SC</option>
                  <option value="SD">SD</option>
                  <option value="TN">TN</option>
                  <option value="TX">TX</option>
                  <option value="UT">UT</option>
                  <option value="VT">VT</option>
                  <option value="VA">VA</option>
                  <option value="WA">WA</option>
                  <option value="WV">WV</option>
                  <option value="WI">WI</option>
                  <option value="WY">WY</option>
                </select>
                <input
                  type="text"
                  name="zip"
                  placeholder="Zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  required
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="county"
                  placeholder="County"
                  value={formData.county}
                  onChange={handleInputChange}
                  className="w-[150px] p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          <section className="mt-8">
            <h3 className="text-2xl text-gray-700 mb-4">
              Demographic Information (optional)
            </h3>

            <div className="flex mb-4 items-start">
              <label className="w-40 text-left pl-1 text-sm pt-2 shrink-0">
                Sex:
              </label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                className="w-[200px] p-2 border border-gray-300 rounded"
              >
                <option value="">Select one...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="flex mb-4 items-start">
              <label className="w-40 text-left pl-1 text-sm pt-2 shrink-0">
                Age:
              </label>
              <select
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-[200px] p-2 border border-gray-300 rounded"
              >
                <option value="">Select one...</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55-64">55-64</option>
                <option value="65-74">65-74</option>
                <option value="75+">75+</option>
              </select>
              <label className="ml-4 text-sm pt-2">Education:</label>
              <select
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                className="ml-2 w-[200px] p-2 border border-gray-300 rounded"
              >
                <option value="">Select one...</option>
                <option value="high-school">High School/GED</option>
                <option value="some-college">Some College</option>
                <option value="associates">Associate's Degree</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="doctorate">Doctorate/PhD</option>
                <option value="medical">Medical Degree</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex mb-4 items-start">
              <label className="w-40 text-left pl-1 text-sm pt-2 shrink-0">
                List
                <br />
                Certifications:
              </label>
              <textarea
                name="certifications"
                value={formData.certifications}
                onChange={handleInputChange}
                className="flex-1 p-2 border border-gray-300 rounded h-[100px]"
              />
            </div>

            <div className="flex mb-4 items-start">
              <label className="w-40 text-left pl-1 text-sm pt-2 shrink-0">
                Other
                <br />
                Training:
              </label>
              <textarea
                name="training"
                value={formData.training}
                onChange={handleInputChange}
                className="flex-1 p-2 border border-gray-300 rounded h-[100px]"
              />
            </div>
          </section>

          <section className="mt-8">
            <h3 className="text-2xl text-gray-700 mb-4">
              Navigator / Program Details
            </h3>
            <div className="flex mb-4 items-start">
              <label className="w-40 text-left pl-1 text-sm pt-2 shrink-0">
                How many years have you served as a Navigator?
              </label>
              <select
                name="yearsAsNavigator"
                value={formData.yearsAsNavigator}
                onChange={handleInputChange}
                className="w-[200px] p-2 border border-gray-300 rounded"
              >
                <option value="">Select one...</option>
                <option value="less-than-1">Less than 1</option>
                <option value="1-5">1-5</option>
                <option value="6-10">6-10</option>
                <option value="10-20">10-20</option>
                <option value="20+">20+</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div className="flex mb-4 items-start">
              <label className="w-40 text-left pl-1 text-sm pt-2 shrink-0">
                <span className="text-red-500 mr-1">*</span>Is your position
                volunteer or paid?
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="positionType"
                    value="volunteer"
                    checked={formData.positionType === "volunteer"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Volunteer
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="positionType"
                    value="paid"
                    checked={formData.positionType === "paid"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Paid
                </label>
              </div>
            </div>

            <div className="flex mb-4 items-start">
              <label className="w-40 text-left pl-1 text-sm pt-2 shrink-0">
                <span className="text-red-500 mr-1">*</span>Is your position
                full or part-time?
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="employmentStatus"
                    value="full-time"
                    checked={formData.employmentStatus === "full-time"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Full-time
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="employmentStatus"
                    value="part-time"
                    checked={formData.employmentStatus === "part-time"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Part-time
                </label>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xl text-gray-700 mb-2">Your Services:</h4>
              <div className="flex gap-4">
                <label>
                  <input
                    type="checkbox"
                    value="clinical"
                    onChange={(e) => handleCheckboxChange(e, "services")}
                    checked={formData.services.includes("clinical")}
                  />
                  Clinical
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="professional"
                    onChange={(e) => handleCheckboxChange(e, "services")}
                    checked={formData.services.includes("professional")}
                  />
                  Professional
                </label>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xl text-gray-700 mb-2">Cancer Types:</h4>
              <div className="flex gap-4">
                <label>
                  <input
                    type="checkbox"
                    value="breast"
                    onChange={(e) => handleCheckboxChange(e, "cancerTypes")}
                    checked={formData.cancerTypes.includes("breast")}
                  />
                  Breast
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="colorectal"
                    onChange={(e) => handleCheckboxChange(e, "cancerTypes")}
                    checked={formData.cancerTypes.includes("colorectal")}
                  />
                  Colorectal
                </label>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xl text-gray-700 mb-2">Languages:</h4>
              <div className="flex gap-4">
                {["Chinese", "English", "French", "German", "Spanish"].map(
                  (lang) => (
                    <label key={lang}>
                      <input
                        type="checkbox"
                        value={lang.toLowerCase()}
                        onChange={(e) => handleCheckboxChange(e, "languages")}
                        checked={formData.languages.includes(
                          lang.toLowerCase()
                        )}
                      />
                      {lang}
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="includeInDirectory"
                  checked={formData.includeInDirectory}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      includeInDirectory: e.target.checked,
                    }))
                  }
                  className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">
                  Include in Directory
                </span>
              </label>
            </div>
          </section>

          <section className="mt-8">
            <h3 className="text-2xl text-gray-700 mb-4">
              Login/Security Information
            </h3>

            <div className="flex mb-4 items-start">
              <label className="w-40 text-left pl-1 text-sm pt-2 shrink-0">
                <span className="text-red-500 mr-1">*</span>Password:
              </label>
              <div className="flex flex-col gap-2">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-[300px] p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="flex mb-4 items-start">
              <label className="w-40 text-left pl-1 text-sm pt-2 shrink-0">
                <span className="text-red-500 mr-1">*</span>Confirm:
              </label>
              <div className="flex flex-col gap-2">
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handleInputChange}
                  required
                  className="w-[300px] p-2 border border-gray-300 rounded"
                />
                <div className="bg-[#fff3cd] text-[#856404] p-3 rounded mt-2 text-sm">
                  <span className="font-semibold">Please Note:</span> Password
                  must be
                  <ul className="list-disc ml-5 mt-1">
                    <li>At least 7 characters long</li>
                    <li>Contain at least one upper case letter</li>
                    <li>Contain at least one lower case letter</li>
                    <li>Contain at least one number</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex mb-4 items-start">
              <label className="w-40 text-left pl-1 text-sm pt-2 shrink-0">
                <span className="text-red-500 mr-1">*</span>Security
                <br />
                Question:
              </label>
              <select
                name="securityQuestion"
                value={formData.securityQuestion}
                onChange={handleInputChange}
                required
                className="w-[300px] p-2 border border-gray-300 rounded"
              >
                <option value="">Select one...</option>
                <option value="mother">
                  What is your mother's maiden name?
                </option>
                <option value="pet">What is your favorite pet's name?</option>
                <option value="city">What city where you born in?</option>
                <option value="friend">
                  What was your childhood best friend's name?
                </option>
                <option value="school">
                  What was the name of your elementary school?
                </option>
              </select>
            </div>

            <div className="flex mb-4 items-start">
              <label className="w-40 text-left pl-1 text-sm pt-2 shrink-0">
                <span className="text-red-500 mr-1">*</span>Response:
              </label>
              <input
                type="text"
                name="securityAnswer"
                value={formData.securityAnswer}
                onChange={handleInputChange}
                required
                className="w-[300px] p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex mb-4 items-start">
              <div className="w-40"></div>
              <div className="flex-1">
                <div className="g-recaptcha" data-sitekey="your_site_key"></div>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-8 px-4 py-2 bg-blue-500 text-white rounded ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>

          {submitError && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded">
              {submitError}
            </div>
          )}
        </>
      )}
    </form>
  );
};

export default MemberApp;
