import React from "react";
import { useSelector } from "react-redux";
import { FaImdb } from "react-icons/fa";
import { FaWikipediaW } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

const PersonHero = () => {
  const { personDetails } = useSelector((state) => state.personDetailsReducer);
  return (
    <section className="pt-20 w-full px-24 flex gap-10">
      <img
        src={`${import.meta.env.VITE_BASE_TMDB_POSTER_PATH}${
          personDetails.profile_path
        }`}
        className="w-1/5"
      />
      <div className="py-3 flex flex-col gap-5">
        <div className="flex gap-3">
          <h4 className="text-2xl font-semibold">{personDetails.name}</h4>
          <h4 className="text-2xl font-semibold">
            ({personDetails.birthday?.substr(0, 4)})
          </h4>
        </div>
        <div className="flex flex-col gap-8">
          <p className="font-normal">
            {personDetails.biography?.substr(0, 1400)}...
          </p>
          <div className="flex flex-row">
            <span>
              {personDetails.imdb_id && (
                <Link
                  to={`https://www.imdb.com/name/${personDetails.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent">
                  <FaImdb className="w-8 h-8 text-yellow-700" />
                </Link>
              )}
            </span>
            <span>
              {personDetails.wikidata_id && (
                <Link
                  to={`https://www.wikidata.org/wiki/${personDetails.wikidata_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent">
                  <FaWikipediaW className="w-8 h-8 text-white" />
                </Link>
              )}
            </span>
            <span>
              {personDetails.facebook_id && (
                <Link
                  //   to={`https://www.wikidata.org/wiki/${personDetails.wikidata_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent">
                  <FaFacebook className="w-8 h-8 text-white" />
                </Link>
              )}
            </span>
            <span>
              {personDetails.instagram_id && (
                <Link
                  to={`https://www.instagram.com/angelinajolie/${personDetails.instagram_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent">
                  <FaInstagram className="w-8 h-8 text-white" />
                </Link>
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonHero;
