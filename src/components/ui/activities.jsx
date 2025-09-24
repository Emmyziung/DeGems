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
import img1 from "@/img/family-enjoying-their-quality-winter-time.jpg";

const Activities = () => {
  const items = [
    {
      title: "Annual Charity Gala",
      date: "February 28, 2024",
      location: "Iperu-Remo",
      image: img1,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero qui et tempora doloribus incidunt non ducimus.",
    },
    {
      title: "Community Outreach",
      date: "March 12, 2024",
      location: "Iperu-Remo",
      image: img1,
      description:
        "Explicabo iste sunt aliquid non, suscipit maiores culpa illum maxime consequatur quis nobis eveniet.",
    },
    {
      title: "Annual Dinner Night",
      date: "April 5, 2024",
      location: "Iperu-Remo",
      image: img1,
      description:
        "Et obcaecati aut sequi perspiciatis. Vero qui et tempora doloribus incidunt non ducimus.",
    },
  ];

  return (
    <section className=" pb-10 md:pb-12" >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-2xl md:text-3xl font-semibold tracking-tight text-primary">
          Recent Activities
        </h2>

   

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <Card key={idx} className="!pb-4 overflow-hidden rounded-lg">
              <div className="relative w-full h-40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent"
                  aria-hidden="true"
                ></div>

                <span className="absolute bottom-3 left-3 flex items-center gap-1 text-accent-foreground text-sm font-medium px-2 py-1 rounded-md">
                  <Calendar className="size-4" aria-hidden="true" /> &nbsp;{item.date}
                </span>
              </div>

              <div className="flex flex-col">
                <CardHeader className="mt-3 mb-1">
                  <CardTitle className="!my-0">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>

                <CardFooter className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="size-4" aria-hidden="true" />
                    <span className="text-sm">{item.location}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground !rounded-sm" style={{borderRadius: '4px'}}
                  >
                    View Photos
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
        < Button className="mt-10 !mx-auto flex !bg-gradient-to-r !from-orange-400 !to-orange-600 !text-white rounded hover:!bg-accent/90 transition-colors text-base shadow-sm py-5 font-semibold  ">
          View All Activities
        </Button>
      </div>
    </section>
  );
};

export default Activities;