"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateStartupPage() {
  const [form, setForm] = useState({
    startupName: "",
    industry: "",
    description: "",
    website: "",
    address: "",
    email: "",
    mobile: "",
    fundingGoal: "",
    raisedSoFar: "",
    founded: "",
    problem: "",
    solution: "",
    traction: "",
    targetMarket: "",
    tam: "",
    demand: "",
    scalability: "",
    competitors: "",
    advantage: "",
    revenueStreams: "",
    annualRevenue: "",
    projectedRevenue: "",
    previousFunding: "",
    seeking: "",
    investorROI: "",
    equityAvailable: "",
  });

  const [team, setTeam] = useState([{ name: "", role: "", email: "", linkedIn: "" }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTeamChange = (index, e) => {
    const newTeam = [...team];
    newTeam[index][e.target.name] = e.target.value;
    setTeam(newTeam);
  };

  const addTeamMember = () => {
    setTeam([...team, { name: "", role: "", email: "", linkedIn: "" }]);
  };

  const removeTeamMember = (index) => {
    const newTeam = [...team];
    newTeam.splice(index, 1);
    setTeam(newTeam);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/entrepreneur/startups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          fundingGoal: Number(form.fundingGoal),
          raisedSoFar: Number(form.raisedSoFar),
          founded: Number(form.founded),
          annualRevenue: Number(form.annualRevenue),
          team,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
      } else {
        setMessage("Startup created successfully!");
        setForm({
          startupName: "",
          industry: "",
          description: "",
          website: "",
          address: "",
          email: "",
          mobile: "",
          fundingGoal: "",
          raisedSoFar: "",
          founded: "",
          problem: "",
          solution: "",
          traction: "",
          targetMarket: "",
          tam: "",
          demand: "",
          scalability: "",
          competitors: "",
          advantage: "",
          revenueStreams: "",
          annualRevenue: "",
          projectedRevenue: "",
          previousFunding: "",
          seeking: "",
          investorROI: "",
          equityAvailable: "",
        });
        setTeam([{ name: "", role: "", email: "", linkedIn: "" }]);

        // Redirect to startups page after successful submit
        router.push("/entrepreneur/startups");
      }
    } catch (err) {
      setMessage("Server error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Startup</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            type={
              ["fundingGoal", "raisedSoFar", "founded", "annualRevenue"].includes(key)
                ? "number"
                : "text"
            }
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key}
            className="border p-2 w-full rounded"
            required
          />
        ))}

        <h2 className="text-xl font-semibold mt-6">Team Members</h2>
        {team.map((member, index) => (
          <div key={index} className="border p-4 rounded space-y-2 mt-2">
            {["name", "role", "email", "linkedIn"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={member[field]}
                onChange={(e) => handleTeamChange(index, e)}
                placeholder={`Team ${field}`}
                className="border p-2 w-full rounded"
                required={field !== "linkedIn"}
              />
            ))}
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeTeamMember(index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <div className="flex justify-between items-start mt-6">
          <div className="flex flex-col space-y-2">
            <button
              type="button"
              onClick={addTeamMember}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Add Team Member
            </button>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>

          <button
            type="button"
            onClick={() => router.push("/entrepreneur/startups")}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Back to Startups
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
}
