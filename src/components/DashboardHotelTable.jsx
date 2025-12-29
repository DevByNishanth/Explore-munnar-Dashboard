import React from "react";
import fiveStar from "../assets/star.svg";
import threestar from "../assets/threestar.svg";
import tent from "../assets/tent.svg";
import leaf from "../assets/leaf.svg";
import homeIcon from "../assets/homeIcon.svg";
import { Hotel } from "lucide-react";
const data = [
  {
    icon: fiveStar,
    hotelName: "Misty Hill Eco Retreat",
    date: "10/10/2025",
    category: "5 star",
    icon_bg: "bg-violet-100",
  },
  {
    icon: threestar,
    hotelName: "Misty Hill Eco Retreat",
    date: "10/10/2025",
    category: "3 star",
    icon_bg: "bg-red-100",
  },
  {
    icon: tent,
    hotelName: "Misty Hill Eco Retreat",
    date: "10/10/2025",
    category: "Tents",
    icon_bg: "bg-orange-100",
  },
  {
    icon: homeIcon,
    hotelName: "Misty Hill Eco Retreat",
    date: "10/10/2025",
    category: "Home stays & guest house",
    icon_bg: "bg-gray-100",
  },
  {
    icon: leaf,
    hotelName: "Misty Hill Eco Retreat",
    date: "10/10/2025",
    category: "Eco cottages",
    icon_bg: "bg-blue-100",
  },
];

const DashboardHotelTable = () => {
  console.log("DashboardHotelTable Component Rendering"); // Debug log
  const apiURL = import.meta.env.VITE_API_URL;
  const [data, setData] = React.useState([]);

  const getIconData = (stayType) => {
    const type = stayType?.toLowerCase();
    if (type?.includes("5 star") || type?.includes("resort")) return { icon: fiveStar, bg: "bg-violet-100" };
    if (type?.includes("3 star")) return { icon: threestar, bg: "bg-red-100" };
    if (type?.includes("tent")) return { icon: tent, bg: "bg-orange-100" };
    if (type?.includes("home") || type?.includes("guest")) return { icon: homeIcon, bg: "bg-gray-100" };
    if (type?.includes("eco")) return { icon: leaf, bg: "bg-blue-100" };
    return { icon: fiveStar, bg: "bg-gray-100" }; // fallback
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // DD/MM/YYYY
  };

  const colors = ["#22A447", "#F8964C", "#70A6E8", "#BB4430", "#30abbb", "#8884d8", "#82ca9d"];

  React.useEffect(() => {
    // console.log("calling", );
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}/api/dashboard/recent-hotel-bookings`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        // console.log("Recent Hotel Bookings API Response:", result);

        let fetchedData = [];
        if (Array.isArray(result)) {
          fetchedData = result;
        } else if (result && Array.isArray(result.data)) {
          fetchedData = result.data;
        }

        const mappedData = fetchedData.slice(0, 5).map((item, index) => ({
          ...item,
          iconData: getIconData(item.stayType),
          formattedDate: formatDate(item.date),
          iconColor: colors[index % colors.length],
        }));
        setData(mappedData);
        // console.log("Mapped Data:", mappedData);

      } catch (error) {
        console.error("Error fetching recent hotel bookings:", error);
      }
    };
    fetchData();
  }, [apiURL]);

  return (
    <>
      <section className="h-[210px] w-full rounded-lg ">
        <div className="table-container mb-2 space-y-3 h-[100%] ">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="card  flex items-center justify-between pr-2"
              >
                <div className="first-container flex gap-3 items-center">
                  <div
                    className={`icon-container bg-gray-100 border border-gray-200  w-fit p-2 rounded-full`}
                  >
                    <Hotel style={{ color: item.iconColor }} />
                    {/* <img src={item.iconData.icon} className="w-5 h-5" /> */}
                  </div>
                  <div>
                    <h1 className="font-medium text-gray-700 text-[14px]">
                      {item.hotelName.slice(0, 13)} ..
                    </h1>
                    <h1 className="text-[12px] mt-[-2px] text-gray-500">
                      {item.stayType}
                    </h1>
                  </div>
                </div>
                <div className="second-container">
                  <h1 className="text-gray-500 text-[13px]">{item.formattedDate}</h1>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default DashboardHotelTable;
