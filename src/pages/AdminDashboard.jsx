import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddMemberForm from "@/components/admin/AddMemberForm";
import Applications from "@/components/admin/Applications";
import ViewMembersTable from "@/components/admin/ViewMembersTable";
import AddActivityForm from "@/components/admin/AddActivityForm";
import ViewActivitiesList from "@/components/admin/ViewActivitiesList";
import PhotoManager from "@/components/admin/PhotoManager";
import { HiUserAdd } from "react-icons/hi";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { HiUserGroup } from "react-icons/hi2";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FaRegCalendarPlus } from "react-icons/fa6";
import { FaCalendarPlus } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa6";
import { MdAddPhotoAlternate } from "react-icons/md";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useDatabaseContext } from "@/context/databaseContext";
import { useAdminContext } from "@/context/AdminContext";
import { TbPhotoX } from "react-icons/tb";
const AdminDashboard = () => {
const { members, applications } = useAdminContext();
  const [selectedView, setSelectedView] = useState("add-member");

  const navItems = [
    { id: "add-member", label: "Add New Member", category: "Members"  },
    { id: "view-members", label: "View Members Database",  category: "Members" },
    { id: "applications", label: "New Applications",  category: "Applications" },
    { id: "add-activity", label: "Add Activity",  category: "Activities" },
    { id: "view-activities", label: "View Activities",  category: "Activities" },
    { id: "add-photos", label: "Add Photos",  category: "Photos" },
    { id: "remove-photos", label: "Remove Photos",  category: "Photos" },

  ];

  const renderContent = () => {
    switch (selectedView) {
      case "add-member":
        return <AddMemberForm />;
      case "view-members":
        return <ViewMembersTable clubMembers={members} />;
        case "applications":
        return <Applications />;
      case "add-activity":
        return <AddActivityForm />;
      case "view-activities":
        return <ViewActivitiesList />;
      case "add-photos":
      case "remove-photos":
        return <PhotoManager view={selectedView} />;
      default:
        return <AddMemberForm />;
    }
  };
  const rendericon = (id) => {
    switch (id) {
      case "add-member":
        return selectedView === id ? <HiUserAdd size={18} className="text-primary"/> : <HiOutlineUserPlus size={18} strokeWidth={2} className="text-primary"/>;
      case "view-members":
        return selectedView===id ? <HiUserGroup size={18} className="text-primary"/> : <HiOutlineUserGroup size={18} strokeWidth={2} className="text-primary" />;
      case "applications":
        return selectedView===id ? <HiUserGroup size={18} className="text-primary"/> : <HiOutlineUserGroup size={18} strokeWidth={2} className="text-primary" />;
      case "add-activity":
        return selectedView===id ? <FaCalendarPlus size={18} className="text-primary"/> : <FaRegCalendarPlus size={18} className="text-primary" />;
      case "view-activities":
        return  selectedView===id ? <FaCalendar size={18} className="text-primary"/> : <FaRegCalendar size={18} className="text-primary" />;
      case "add-photos":
        return selectedView===id ? <MdAddPhotoAlternate size={18} className="text-primary"/> : <MdOutlineAddPhotoAlternate size={18} className="text-primary" />
      case "remove-photos":
        return <TbPhotoX size={18} className="text-primary" />;
      default:
        return <HiUserAdd />;
    }
  };

  const groupedNav = navItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className=" bg-background">
      <div className="flex max-md:flex-col">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:top-17 md:h-screen border-r bg-card flex-1">
          <div className="flex flex-col    overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h2 className="text-base font-semibold pt-2 text-primary">Admin Dashboard</h2>
            </div>
            <div className="mt-1 flex-grow flex flex-col">
              <nav className="flex-1 pl-2 space-y-1">
                {Object.entries(groupedNav).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="px-3 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {category}
                    </h3>
                    {items.map((item) => (
                      <button
                        key={item.id}
                      
                        onClick={() => setSelectedView(item.id)}
                        className={`w-full flex gap-2 items-center text-left px-3 py-2 !text-muted-foreground rounded-l-sm text-sm font-medium transition-colors ${
                          selectedView === item.id
                            ? "!bg-gray-200 "
                            : 
                            "!bg-white  hover:!bg-gray-200 "
                        }`}
                      >
                       {rendericon(item.id)}  {item.label} {item.id === "applications" && applications.length > 0 && (
                        <span className="ml-auto inline-block bg-gray-400 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                          {applications.length}
                        </span>
                      )}
                      </button>
                    ))}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Mobile Top Nav */}
        <div className="md:hidden">
          <div className="bg-card px-4 py-3">
            <h2 className="text-lg font-semibold text-primary mb-3">Admin Dashboard</h2>
            <nav className="flex border-b border-border overflow-x-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedView(item.id)}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedView === item.id
                      ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground/90'
                  }`}
                  role="tab"
                  aria-selected={selectedView===item.id}
                >
                  {item.label} {item.id === "applications" && applications.length > 0 && (
                    <span className="ml-2 inline-block bg-gray-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      {applications.length}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-white flex overflow-x-hidden min-h-screen">
          <div className="max-md:hidden w-64 h-20">&nbsp;</div>
          <div className="py-6 w-[calc(100%-256px)] max-md:w-full  ">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          {/*    {selectedView === "remove-photos"  ?  <PhotoManager view={selectedView} />: selectedView === "view-members" ? <ViewMembersTable clubMembers={members} /> : <Card className='rounded max-w-full w-full overflow-x-hidden '>
                <CardHeader className='px-4'>
                  <CardTitle className='text-muted-foreground/80 pt-4 pb-2'>
                    {navItems.find(item => item.id === selectedView)?.label || "Admin Dashboard"}
                  </CardTitle>
                </CardHeader>
                <CardContent className='px-4 pb-4 max-w-full w-full overflow-hidden' >
                  {renderContent()}
                </CardContent>
              </Card>
              } */}
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;