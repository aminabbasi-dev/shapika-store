import type { Profile } from "../types/profile.types";


interface ProfileCardProps {
  profile: Profile;
}


export function ProfileCard({
  profile,
}: ProfileCardProps) {
  return (
    <div className="max-w-xl rounded-2xl bg-white p-6 shadow dark:bg-gray-800">

      <div className="mb-6 flex items-center gap-4">

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-2xl">
          {profile.first_name}
        </div>


        <div>
          <h1 className="text-xl font-bold">
            {profile.first_name} {profile.last_name}
          </h1>

          <p className="text-gray-500">
            {profile.email}
          </p>
        </div>

      </div>


      <div className="space-y-3">

        <div>
          <span className="font-semibold">
            شماره موبایل:
          </span>

          <span className="mr-2">
            {profile.phone_number || "ثبت نشده"}
          </span>
        </div>


        <div>
          <span className="font-semibold">
            نوع حساب:
          </span>

          <span className="mr-2">
            {profile.role}
          </span>
        </div>


      </div>

    </div>
  );
}