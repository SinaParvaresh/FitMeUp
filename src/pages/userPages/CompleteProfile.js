import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import FormCard from "../../components/UI/FormCard";

const CompelteProfile = () => {
  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    navigate("/calorie-tracker");
  };

  return (
    <FormCard onSubmit={onSubmitHandler}>
      <Text>Create your diet and begin your workout journey</Text>
      <Button fullWidth mt="md" radius="md" onClick={onSubmitHandler}>
        Get Started
      </Button>
    </FormCard>
  );
};

export default CompelteProfile;
