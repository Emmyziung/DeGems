import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Members = () => {
  const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();
     const formData = {
     firstName: e.target.firstName.value,
    lastName: e.target.lastName.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
    reason: e.target.reason.value,
  };
  console.log("Submitting application:", formData);

  try {
    const res = await fetch("http://localhost:3000/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.success) {
      alert("Application submitted!");
    } else {
      alert("Error: " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Network error");
  }
   
  };

  const referSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-heading font-bold text-primary mb-8">Join Our Community</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-heading font-semibold mb-4">Become a Member</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              <div>
                <label htmlFor="reason" className="block text-sm font-medium mb-1">Reason for joining</label>
                <textarea
                  id="reason"
                  rows="4"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                ></textarea>
              </div>
              <Button type="submit" className="px-4 py-2 !bg-gradient-to-r !from-orange-500 !to-orange-600 !text-white rounded hover:!bg-accent/90 transition-colors shadow-xs text-base">Submit Application</Button>
            </form>
            <div className="mt-4">
              <p>Already a Member? &nbsp;<span  className="cursor-pointer text-primary text-decoration-line" onClick={referSignIn}>Sign In</span></p>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-heading font-semibold mb-4">Why Join De GEMS?</h2>
            <ul className="space-y-2 text-sm">
              <li>• Connect with like-minded individuals</li>
              <li>• Participate in exciting activities and events</li>
              <li>• Access exclusive member benefits</li>
              <li>• Contribute to community development</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;