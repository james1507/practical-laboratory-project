import axios from "axios";

const handleSignIn = async (
  formData,
  setLoading,
  dispatch,
  navigate,
  setError
) => {
  if (!validateForm(formData, setError)) {
    return;
  }

  const { username, password } = formData;

  setLoading(true);

  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/signin",
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      navigate("/index");
      setLoading(false);
    } else {
      setError("An error occurred during login.");
      setLoading(false);
    }
  } catch (error) {
    if (error.response && error.response.data.message === "User Not found.") {
      setError("User not found. Please check your credentials.");
    } else {
      setError("An error occurred during login.");
    }
  } finally {
    setLoading(false);
  }
};

const validateForm = (formData, setError) => {
  const { username, password } = formData;

  // Basic validation example: Check if username and password are not empty
  if (!username || !password) {
    setError("Tên đăng nhập và mật khẩu không được để trống.");
    return false;
  }

  return true;
};

const handleInputChange = (e, setFormData, formData) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

export { handleSignIn, handleInputChange };
