import { Link } from "react-router-dom";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { MapPin, Calendar } from "lucide-react";

const ActivityCard = ({ activity }) => {
  return (
    <Card className="!pb-4 overflow-hidden rounded-lg">
      <div className="relative w-full h-40">
        <img
          src={activity.img[0]}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0b1742]/30" aria-hidden="true"></div>
        <span className="absolute bottom-3 left-3 flex items-center gap-1 text-accent-foreground text-sm font-medium px-2 py-1 rounded-md">
          <Calendar className="size-4" aria-hidden="true" /> &nbsp;{activity.date}
        </span>
      </div>

      <div className="flex flex-col">
        <CardHeader className="mt-3 mb-1">
          <CardTitle className="!my-0">{activity.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-3">{activity.description}</CardDescription>
        </CardContent>

        <CardFooter className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="size-4" aria-hidden="true" />
            <span className="text-sm">{activity.location}</span>
          </div>
          <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground !rounded-sm">
            <Link to={`/Activities/${activity.id}`}>View Details</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ActivityCard;