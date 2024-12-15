import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../rtk/store";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import toast from "react-hot-toast";
import { setUser } from "../../../rtk/authslice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchUserDetails = async () => {
    try {
      if (user) {
        setLoading(true);
        const res = await api.getUser(user?.id);
        setFormData({
          email: res.email,
          mobile: res.mobile,
        });
      } else {
        toast.error("User does not exist");
      }
    } catch {
      console.log("error occured while getting user details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [user.email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData?.email || formData.mobile) {
      const res = await api.updateUser(user?.id, formData);
      if (res) {
        dispatch(setUser({ user: res }));
      }
      localStorage.setItem("user", JSON.stringify(res.user));
      alert("User profile updated");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          <span className="text-4xl">
            <i className={"ri-user-fill cursor-pointer text-primary-dark"}></i>
          </span>

          <div className="ml-6">
            <h3 className="text-2xl font-semibold">
              Email: {formData?.email || "N/A"}
            </h3>
            <p className="text-gray-700">
              Mobile Number: {formData?.mobile || "N/A"}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-auto text-blue-500 hover:text-blue-700"
          >
            <i className="ri-edit-box-line"></i>
          </button>
        </div>
      </div>

      {/* modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg md:w-96 max-w-xl mx-auto relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 mt-2"
              onClick={() => setIsModalOpen(false)}
            >
              <i className="ri-close-line size-12 p-2 bg-black rounded-full"></i>
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit profile</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={formData?.email}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                  }}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  value={formData?.mobile}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      mobile: e.target.value,
                    }));
                  }}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`mt-4 w-full bg-blue-500 text-white py2 px-2 rounded-md ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
