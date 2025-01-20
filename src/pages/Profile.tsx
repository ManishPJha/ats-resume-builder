import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, logout } = useAuth0();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Your Profile
          </h1>
          <p className="text-lg text-gray-600">
            Manage your account settings and preferences.
          </p>
        </div>

        {/* Profile Card */}
        <div className="mt-10 bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            {/* Profile Picture */}
            <div className="flex justify-center">
              <img
                src={user?.picture}
                alt={user?.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            </div>

            {/* User Information */}
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
              <p className="text-lg text-gray-600 mt-2">{user?.email}</p>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => alert('Edit profile functionality coming soon!')}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300"
              >
                Edit Profile
              </button>
              <button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
                className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-pink-700 transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
