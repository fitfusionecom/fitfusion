import { Metadata } from "next";
import { retrieveCustomer } from "@/lib/data/customer";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile page",
};

const ProfilePage = async () => {
  const customer = await retrieveCustomer();
  return (
    <div>
      <h1>Profile</h1>
      <p>{customer?.email}</p>
    </div>
  );
};

export default ProfilePage;
