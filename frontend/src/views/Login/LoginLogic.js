import axios from "axios";
import {
  setLoggedIn,
  setId,
  setEmail,
  setUsername,
  setRoles,
  setFullName,
  setAge,
  setCollage,
  setPosition,
  setMajor,
  setYearExp,
  setAboutMe,
  setImageUrl,
} from "../../redux/Auth/AuthSlice";
import { toast } from "react-toastify";

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
      dispatch(setLoggedIn(true));
      dispatch(setId(response.data.id));
      dispatch(setUsername(response.data.username));
      dispatch(setEmail(response.data.email));
      dispatch(setRoles(response.data.roles));
      dispatch(setFullName(response.data.fullName));
      dispatch(setAge(response.data.age));
      dispatch(setCollage(response.data.collage));
      dispatch(setPosition(response.data.position));
      dispatch(setMajor(response.data.major));
      dispatch(setYearExp(response.data.yearExp));
      dispatch(setAboutMe(response.data.aboutMe));
      dispatch(setImageUrl(response.data.imageUrl));

      toast.success("Đăng nhập thành công!", {
        position: "top-right",
        autoClose: 3000, // Auto close the notification after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/index");
      setLoading(false);

      console.log(response.data.roles);
    } else {
      setError("Có lỗi nào đó trong quá trình đăng nhập.");
      setLoading(false);
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data.message === "Không tìm thấy tài khoản."
    ) {
      setError("Không tìm thấy tài khoản.");
    } else {
      setError("Có lỗi trong quá trình đăng nhập.");
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
