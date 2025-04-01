import InfoBox from "./InfoBox";
const InfoBoxes = () => {
  const renterDescription =
    "Find your dream rental property. Bookmark properties and contact owners.";
  const ownerDescription =
    "List your properties and reach potential tenants. Rent as an Airbnbor long term.";
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Renters"
            description={renterDescription}
            buttonInfo={{
              text: "Browse Properties",
              link: "/properties",
              backgroundColor: "bg-black",
            }}
          />
          <InfoBox
            heading="For Property Owners"
            description={ownerDescription}
            bgColor="bg-blue-100"
            buttonInfo={{
              text: "Add Property",
              link: "/properties/add",
              backgroundColor: "bg-blue-500",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
