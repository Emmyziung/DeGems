import { cn } from "@/lib/utils";
import { useGlobalContext } from "@/context/pageContext";
const TabsNavigation = ({ activeTab, onTabChange }) => {
 const { tabs } = useGlobalContext();

  return (
    <div className="flex mb-6 border-b  border-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-6 py-3 text-sm font-medium transition-colors !bg-white",
            activeTab === tab.id
              ? "border-b-2 border-accent text-accent"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabsNavigation;