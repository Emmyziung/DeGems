import { useState } from "react";
import ClubUpdates from "./ClubUpdates";
import PaymentHistory from "./PaymentHistory";
import MembershipDues from "./MembershipDues";
import ChangePassword from "./changePassword";
const MembersTabs = () => {
  const [activeTab, setActiveTab] = useState('updates');

  const tabs = [
    { id: 'updates', label: 'Club Updates', component: ClubUpdates },
    { id: 'history', label: 'Payment History', component: PaymentHistory },
    { id: 'dues', label: 'Membership Dues', component: MembershipDues },
     { id: 'password', label: 'Change Password', component: ChangePassword }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div>
      <div className="flex border-b border-border mb-6" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            role="tab"
            aria-selected={activeTab === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default MembersTabs;