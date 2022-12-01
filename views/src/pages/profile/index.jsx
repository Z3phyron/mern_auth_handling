import { Avatar, Button, Input, Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { Container, Form, FormCtrl, Media, Wrapper } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { BsPlus } from "react-icons/bs";
import { reset, updateUser } from "../../features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { token, isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    firstName: user?.firstName ? user?.firstName : "",
    lastName: user?.lastName ? user?.lastName : "",
    email: user?.email ? user?.email : "",
    phone: user?.phone ? user?.phone : 0,
    street: user?.address?.street ? user?.address?.street : "",
    country: user?.address?.country ? user?.address?.country : "",
    city: user?.address?.city ? user?.address?.city : "",
    image: user?.profile_pic ? user?.profile_pic : null,
  });
  const { firstName, lastName, email, phone, street, city, country, image } =
    formData;
  const [selectedImages, setSelectedImages] = useState(image || null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  const onFileChange = (e) => {
    const selectedFiles = URL.createObjectURL(e.target.files[0]);

    console.log(selectedFiles);
    setFormData((prevState) => ({
      ...prevState,
      image: e.target.files,
    }));
    setSelectedImages(selectedFiles);
    // console.log(image)
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
      // navigate("/");
      dispatch(reset());
     
    }
  }, [isSuccess, navigate, dispatch, isError, message, token]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = new FormData();

    // if (image == null) {}
    userData.append("firstName", firstName);
    userData.append("lastName", lastName);
    userData.append("email", email);
    userData.append("phone", phone);
    userData.append("street", street);
    userData.append("city", city);
    userData.append("country", country);
    userData.append("image", image[0]);
    // alert(JSON.stringify(formData));
    dispatch(updateUser(userData));
    dispatch(reset());
  };

  return (
    <Layout>
      <Container>
        <Wrapper>
          <Form onSubmit={onSubmit}>
            <Media>
              <Avatar
                src={selectedImages}
                squared
                css={{ size: "$20" }}
                className="image"
              />
              <div className="input">
                <BsPlus className="icon" />
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={onFileChange}
                />
              </div>
            </Media>

            <FormCtrl>
              <Input
                fullWidth
                color="primary"
                aria-label="..."
                bordered
                placeholder="First Name...."
                size="md"
                name="firstName"
                value={firstName}
                onChange={onChange}
              />
              <Input
                fullWidth
                color="primary"
                aria-label="..."
                bordered
                placeholder="Last Name...."
                size="md"
                name="lastName"
                value={lastName}
                onChange={onChange}
              />
            </FormCtrl>
            <FormCtrl>
              <Input
                fullWidth
                color="primary"
                aria-label="..."
                bordered
                placeholder="Email...."
                size="md"
                name="email"
                value={email}
                onChange={onChange}
              />
              <Input
                fullWidth
                color="primary"
                aria-label="..."
                bordered
                placeholder="Phone...."
                size="md"
                name="phone"
                type={"number"}
                value={phone}
                onChange={onChange}
              />
            </FormCtrl>
            <FormCtrl>
              <Input
                fullWidth
                color="primary"
                aria-label="..."
                bordered
                placeholder="Street"
                size="md"
                name="street"
                value={street}
                onChange={onChange}
              />
              <Input
                fullWidth
                color="primary"
                aria-label="..."
                bordered
                placeholder="City...."
                size="md"
                name="city"
                value={city}
                onChange={onChange}
              />
              <Input
                fullWidth
                color="primary"
                aria-label="..."
                bordered
                placeholder="Country...."
                size="md"
                name="country"
                value={country}
                onChange={onChange}
              />
            </FormCtrl>
            <Button
              rounded
             
              type="submit"
              size={"md"}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loading type="points" color={"white"} className={"btn"} />
              ) : (
                "Update"
              )}
            </Button>
          </Form>
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default Index;
