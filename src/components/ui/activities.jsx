import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./button";
import { MapPin, Calendar } from "lucide-react";

import { useDatabaseContext } from "@/context/databaseContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ActivityCard from "./ActivityCard";
const Activities = () => {
   const {activities } = useDatabaseContext();
 


  const threeAcivities = activities.slice(0,3)

  return (
    <section className=" pb-10 md:pb-12" >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-2xl md:text-3xl font-semibold tracking-tight text-primary">
          Recent Activities
        </h2>

   

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {threeAcivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
        <Link to="/Activities">
        < Button className="mt-10 !mx-auto flex !bg-gradient-to-r !from-orange-400 !to-orange-600 !text-white rounded hover:!bg-accent/90 transition-colors text-base shadow-sm py-5 font-semibold  ">
          View All Activities
        </Button>
        </Link>
      </div>
    </section>
  );
};

export default Activities;