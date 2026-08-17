import { getProfile } from "@/features/profile/services/getProfile";
import { ProfileCard } from "@/features/profile/components/ProfileCard";


export default async function ProfilePage() {

  const profile = await getProfile();


  return (
    <main className="container mx-auto py-10">

      <h1 className="mb-6 text-3xl font-bold">
        پروفایل کاربری
      </h1>


      <ProfileCard profile={profile} />

    </main>
  );
}