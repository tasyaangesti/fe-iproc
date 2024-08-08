"use client";

export default function DetailUser({ user }) {
  if (!user) {
    return <p className="text-center text-red-500">User not found</p>;
  }

  return (
    <div className="w-full overflow-hidden dark:bg-gray-900">
      <div className="flex flex-col">
        {/* profile i */}
        <div className="relative mx-auto flex justify-center pt-16">
          <img
            src={user.image || "https://via.placeholder.com/150"}
            alt="User Profile"
            className="rounded-full lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500"
          />
        </div>
        {/* full name */}
        <h1 className="text-center my-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl font-serif">
          {user.firstName} {user.lastName}
        </h1>
        <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4">
          {/* detail */}
          <div className="w-full py-6 flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  <div className="py-3">
                    <dt className="text-gray-500 md:text-lg dark:text-gray-400">
                      First Name
                    </dt>
                    <dd className="text-lg font-semibold">{user.firstName}</dd>
                  </div>
                  <div className="py-3">
                    <dt className="text-gray-500 md:text-lg dark:text-gray-400">
                      Last Name
                    </dt>
                    <dd className="text-lg font-semibold">{user.lastName}</dd>
                  </div>
                  <div className="py-3">
                    <dt className="text-gray-500 md:text-lg dark:text-gray-400">
                      Date Of Birth
                    </dt>
                    <dd className="text-lg font-semibold">{user.birthDate}</dd>
                  </div>
                  <div className="py-3">
                    <dt className="text-gray-500 md:text-lg dark:text-gray-400">
                      Gender
                    </dt>
                    <dd className="text-lg font-semibold">{user.gender}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  <div className="py-3">
                    <dt className="text-gray-500 md:text-lg dark:text-gray-400">
                      Location
                    </dt>
                    <dd className="text-lg font-semibold">
                      {user.address?.country}
                    </dd>
                  </div>
                  <div className="py-3">
                    <dt className="text-gray-500 md:text-lg dark:text-gray-400">
                      Phone Number
                    </dt>
                    <dd className="text-lg font-semibold">{user.phone}</dd>
                  </div>
                  <div className="py-3">
                    <dt className="text-gray-500 md:text-lg dark:text-gray-400">
                      Email
                    </dt>
                    <dd className="text-lg font-semibold">{user.email}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
