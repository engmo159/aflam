import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCredits,
  getExternalDetails,
  getPersonDetails,
  getPersonImages,
} from "../redux/slices/personDetailsSlice";
import { useParams } from "react-router-dom";
import PersonHero from "../components/person/PersonHero";
import { changePageLoading } from "../redux/slices/moviesSlice";
import Loading from "../components/Loading";
import PersonImages from "../components/person/PersonImages";
import CombinedCredits from "../components/person/CombinedCredits";

const PersonDetails = () => {
  const dispatch = useDispatch();
  const { personId } = useParams();
  const { pageLoading } = useSelector((state) => state.moviesReducer);
  const { personDetailsLoading } = useSelector(
    (state) => state.personDetailsReducer
  );

  useEffect(() => {
    dispatch(getPersonDetails(personId));
    dispatch(getExternalDetails(personId));
    dispatch(getPersonImages(personId));
    dispatch(getCredits(personId));
  }, []);

  useEffect(() => {
    dispatch(changePageLoading(true));
  }, []);

  if (pageLoading) {
    return <Loading load={personDetailsLoading} />;
  }

  return (
    <div className=" lg:px-0 px-10 flex flex-col gap-8 ">
      <PersonHero />
      <PersonImages />
      <CombinedCredits />
    </div>
  );
};

export default PersonDetails;
