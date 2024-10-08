import React from "react";
import { useSelector } from "react-redux";
import ExternalLinks from "./ExternalLinks";

const PersonHero = () => {
  const { personDetails, personExternals } = useSelector(
    (state) => state.personDetailsReducer
  );
  return (
    <section className="lg:pt-20 w-full lg:px-24 flex lg:flex-row flex-col gap-10">
      <img
        src={`${import.meta.env.VITE_BASE_TMDB_POSTER_PATH}${
          personDetails.profile_path
        }`}
        className="w-72 h-full pt-8"
      />
      <div className=" lg:py-8 flex flex-col gap-5">
        <div className="flex gap-3">
          <h4 className="text-2xl font-semibold">{personDetails.name}</h4>
          <h4 className="text-2xl font-semibold">
            ({personDetails.birthday?.substr(0, 4)}{" "}
            {personDetails.deathday &&
              `- ${personDetails.deathday.substr(0, 4)} `}
            )
          </h4>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-normal">
            {personDetails.biography?.substr(0, 1200)}...
          </p>
          <p className="font-medium">{personDetails?.place_of_birth}</p>
          <ExternalLinks />
        </div>
      </div>
    </section>
  );
};

export default PersonHero;
