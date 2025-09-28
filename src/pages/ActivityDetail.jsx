import { useParams } from "react-router-dom";
import Breadcrumb from "@/components/ui/Breadcrumb";
import img1 from "@/img/family-enjoying-their-quality-winter-time.jpg";
import img2 from "@/img/23682.jpg";
import img3 from "@/img/8990534.png";

const activities = [
  {
    id: 1,
    title: "Annual Charity Gala",
    date: "February 28, 2024",
    location: "Iperu-Remo",
    image: img1,
    description: "Join us for an elegant evening of dining, entertainment, and giving back to the community. This year's gala features live music, auctions, and special performances. The event will include a silent auction with items donated by local businesses, a live band, and speeches from community leaders. All proceeds go directly to supporting local charities and initiatives.",
  },
  {
    id: 2,
    title: "Community-Outreach",
    date: "March 12, 2024",
    location: "Iperu-Remo",
    image: img2,
    description: "Our monthly community outreach program provides essential services and support to local families in need. Volunteers welcome for food distribution and educational activities. This event focuses on providing meals, educational resources, and recreational activities for children and families in our community.",
  },
  {
    id: 3,
    title: "Annual Dinner Night",
    date: "April 5, 2024",
    location: "Iperu-Remo",
    image: img3,
    description: "A formal dinner event celebrating our club's achievements and honoring outstanding members. Includes keynote speeches and networking opportunities. This prestigious event recognizes the contributions of our members and provides a platform for networking and celebrating our shared successes.",
  },
  {
    id: 4,
    title: "Youth Mentorship Program",
    date: "May 15, 2024",
    location: "Iperu-Remo",
    image: img1,
    description: "Empowering the next generation through mentorship and skill-building workshops. Connect with young professionals and share your expertise. This program pairs experienced professionals with youth to provide guidance, career advice, and practical skills development.",
  },
  {
    id: 5,
    title: "Cultural Festival",
    date: "June 20, 2024",
    location: "Iperu-Remo",
    image: img2,
    description: "Celebrate diversity with traditional music, dance, food, and art from various cultures. A vibrant showcase of our community's rich heritage. Experience authentic cultural performances, traditional cuisine, and art exhibitions from diverse backgrounds.",
  },
  {
    id: 6,
    title: "Business Networking Event",
    date: "July 10, 2024",
    location: "Iperu-Remo",
    image: img3,
    description: "Connect with local entrepreneurs and business leaders. Share ideas, form partnerships, and discover new opportunities in our growing community. This event provides valuable networking opportunities and insights into local business trends.",
  },
];

const ActivityDetail = () => {
  const { id } = useParams();
  const activity = activities.find((a) => a.id === parseInt(id));

  if (!activity) {
    return <div className="min-h-screen flex items-center justify-center">Activity not found</div>;
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Activities", href: "/Activities" },
    { label: activity.title },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-64 md:h-80">
        <img
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumb items={breadcrumbs} />

        <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6">{activity.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="text-base leading-relaxed mb-6">{activity.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <img src={img1} alt="Activity photo" className="w-full rounded-lg shadow-sm" />
              <img src={img2} alt="Activity photo" className="w-full rounded-lg shadow-sm" />
              <img src={img3} alt="Activity photo" className="w-full rounded-lg shadow-sm" />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h2 className="font-heading font-semibold text-lg mb-4">Event Details</h2>
              <div className="space-y-2">
                <p><strong>Date:</strong> {activity.date}</p>
                <p><strong>Location:</strong> {activity.location}</p>
                <p><strong>Time:</strong> 7:00 PM</p>
                <p><strong>Dress Code:</strong> Formal</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;