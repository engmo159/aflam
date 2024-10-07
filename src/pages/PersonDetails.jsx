import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPersonDetails } from "../redux/slices/personDetailsSlice";
import { useParams } from "react-router-dom";
import PersonHero from "../components/person/PersonHero";
import { changePageLoading } from "../redux/slices/moviesSlice";
import Loading from "../components/Loading";

const PersonDetails = () => {
  const dispatch = useDispatch();
  const { personId } = useParams();
  const { pageLoading } = useSelector((state) => state.moviesReducer);
  const { personDetailsLoading } = useSelector(
    (state) => state.personDetailsReducer
  );

  useEffect(() => {
    dispatch(getPersonDetails(personId));
  }, []);

  useEffect(() => {
    dispatch(changePageLoading(true));
  }, []);

  if (pageLoading) {
    return <Loading load={personDetailsLoading} />;
  }

  return (
    <div>
      <PersonHero />
    </div>
  );
};

export default PersonDetails;
