import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Clock, FileText } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa6";
import { useAdminContext } from "@/context/AdminContext";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "../ui/button";

const Applications = () => {
  const { applications, deleteApplication } = useAdminContext();
  const {createUser} = useAuthContext()
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleCardClick = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedApplication(null);
      setIsClosing(false);
    }, 300);
  };
  const handleApprove = (application) => {
    createUser(application.email,application.lastName, application.firstName, application.lastName, application.phone)
    deleteApplication(application.id)
  }
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  if (!applications || applications.length === 0) {
    return (
      <Card className='rounded max-w-full w-full overflow-x-hidden'>
        <CardHeader className='px-4'>
          <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Membership Applications</h1>
          <p className="text-muted-foreground">
            Review and manage membership applications for your organization
          </p>
        </div>
        </CardHeader>
        <CardContent className='px-4 pb-6 pt-2'>
          <div className="text-center py-8 text-muted-foreground">
            No applications found.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className='-mt-6 rounded border-0 shadow-none max-w-full w-full overflow-x-hidden'>
        <CardHeader className='px-4'>
           <div className="py-2">
          <h1 className="text-2xl font-bold text-primary text-nowrap whitespace-nowrap">Membership Applications</h1>
          <p className="text-muted-foreground">
            Review and manage membership applications for your organization
          </p>
        </div>
        </CardHeader>
        <CardContent className='px-4 pb-6 pt-2'>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {applications.map((application) => (
              <Card
                key={application.id}
                className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] py-4"
                onClick={() => handleCardClick(application)}
              >
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-bold">{application.firstName+ ' ' + application.lastName || 'Unknown'}</CardTitle>
                  <Badge className={statusColors[application.status] || statusColors.pending} variant="secondary">
                    {(application.status || 'pending').charAt(0).toUpperCase() + (application.status || 'pending').slice(1)}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{application.email || 'No email'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{application.phone || 'No phone'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      
                          <span>
            
            {application.createdAt
              ? application.createdAt.toDate().toDateString()
              : "No date available"}
          </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal for Application Details */}
      {isModalOpen && selectedApplication && (
        <aside className={`modal-overlay ${isClosing ? 'closing' : ''}`}>
          <div className={`modal-container bg-white overflow-y-auto ${isClosing ? 'closing' : ''}`}>
            <div className="pt-3 px-3 flex bg-white sticky top-0 z-50 justify-start">
              <button className="!bg-white p-2 border-3  border-gray-600 text-gray-600 hover:border-gray-900 hover:text-gray-900 rounded-full" onClick={closeModal}>
                <FaArrowLeft className="h-6 w-6 bg-white  " />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-semibold ">{selectedApplication.firstName+ ' ' + selectedApplication.lastName || 'Unknown'}</h2>
                <Badge className={statusColors[selectedApplication.status] || statusColors.pending} variant="secondary">
                  {(selectedApplication.status || 'pending').charAt(0).toUpperCase() + (selectedApplication.status || 'pending').slice(1)}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-6">
                Application submitted on {selectedApplication.createdAt.toDate().toDateString() || 'Unknown date'}
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/70 hover:bg-muted">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{selectedApplication.email || 'No email'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/70 hover:bg-muted">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{selectedApplication.phone || 'No phone'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/70 hover:bg-muted">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Application Date</p>
                                 <span>
         
            {selectedApplication.createdAt
              ? selectedApplication.createdAt.toDate().toDateString()
              : "No date available"}
          </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Reason for Applying
                    </h3>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/70 hover:bg-muted">
                    <p className="text-sm leading-relaxed">{selectedApplication.reason || 'No reason provided'}</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex justify-between items-center gap-2 mb-3">
                    <Button onClick={()=>handleApprove(selectedApplication)} variant="primary" size={'lg'} className="mr-4 !bg-primary/90 hover:!bg-primary text-white rounded-sm">Accept Application</Button>
                    <Button variant="primary" size="lg" className='!bg-white hover:!bg-gray-100  border-gray-700/35 rounded-sm border '>Reject</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default Applications;
