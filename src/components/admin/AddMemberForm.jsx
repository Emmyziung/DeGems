import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cardTwo";
import { useAuthContext } from "@/context/AuthContext";

const AddMemberForm = () => {
  const {createUser} = useAuthContext()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName:"",
    email: "",
    phone: "",
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adding member:", formData);
    createUser(formData.email, formData.lastName, formData.firstName, formData.lastName, formData.phone)
    alert("Member added successfully!");
    // Reset form
    setFormData({ firstName: "", lastName:"", email: "", phone: "", });
  };

  return (
    <Card className='rounded shadow-sm border-b-2 border-border'>
     
      <CardContent className='px-4 pb-6 pt-2'>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-muted-foreground text-sm font-medium mb-1">
              FirstName
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-muted-foreground text-sm font-medium mb-1">
              LastName
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-muted-foreground text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-muted-foreground text-sm font-medium mb-1">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
     
          <Button type="submit" className="w-full !bg-primary">
            Add Member
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddMemberForm;