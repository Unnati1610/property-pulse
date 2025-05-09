import connectDB from "@/config/database";
import User from "@/models/User";
import PropertyCard from "@/components/PropertyCard";
import { getSessionUser } from "@/utils/getSessionUser";

const savedPropertiesPage = async () => {
  await connectDB();
  await import("@/models/Property");
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("ID is required");
  }
  const { userId } = sessionUser;

  const user = await User.findById(userId).populate("bookmarks").lean();
  const { bookmarks } = user;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default savedPropertiesPage;
