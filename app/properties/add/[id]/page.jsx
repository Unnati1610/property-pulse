// "use client";
// import {
//   useRouter,
//   useParams,
//   useSearchParams,
//   usePathname,
// } from "next/navigation";

// const PropertyPage = () => {
//   const router = useRouter();
//   const param = useParams();
//   const searchParam = useSearchParams();
//   const pathName = usePathname();
//   console.log(router);
//   return (
//     <div>
//       <button onClick={() => router.replace("/")}>Go to home</button>
//       {/* URL:properties/add/123 */}
//       <p>Property Page {param.id}</p>
//       {/* URL:properties/add/123?name=test */}
//       <p>Property Page {searchParam.get("name")}</p>
//       <p>Property Page {pathName}</p>
//     </div>
//   );
// };

// export default PropertyPage;

const PropertyPage = ({ params }) => {
  return <div>Property Page {params.id}</div>;
};

export default PropertyPage;
