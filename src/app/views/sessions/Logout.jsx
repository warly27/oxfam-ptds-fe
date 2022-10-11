import React, { useEffect } from "react";
import Loading from "../../components/MatxLoading";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <>
      <Loading />
    </>
  );
};

export default NotFound;
