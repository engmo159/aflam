import { useSelector } from "react-redux";
import { FaImdb } from "react-icons/fa";
import { FcWikipedia } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const ExternalLinks = () => {
  const { personExternals } = useSelector(
    (state) => state.personDetailsReducer
  );
  return (
    <div className="flex flex-col gap-2">
      <span>Social Links : </span>
      <div className="flex gap-5 flex-wrap">
        {personExternals.imdb_id && (
          <Link
            to={`https://www.imdb.com/name/${personExternals.imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent">
            <FaImdb className="w-10 h-10 text-yellow-700" />
          </Link>
        )}
        {personExternals.wikidata_id && (
          <Link
            to={`https://www.wikidata.org/wiki/${personExternals.wikidata_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent">
            <FcWikipedia className="w-10 h-10 text-white" />
          </Link>
        )}
        {personExternals.facebook_id && (
          <Link
            to={`https://web.facebook.com/${personExternals?.facebook_id}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent">
            <FaFacebookSquare className=" w-10 h-10 text-light-blue-900" />
          </Link>
        )}
        {personExternals.instagram_id && (
          <Link
            to={`https://www.instagram.com/${personExternals?.instagram_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent">
            <FaInstagram className="w-10 h-10 " />
          </Link>
        )}
        {personExternals.tiktok_id && (
          <Link
            to={`https://www.tiktok.com/@${personExternals?.tiktok_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent">
            <AiFillTikTok className="w-10 h-10  " />
          </Link>
        )}
        {personExternals.twitter_id && (
          <Link
            to={`https://x.com/${personExternals?.twitter_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent">
            <FaSquareXTwitter className="w-10 h-10 " />
          </Link>
        )}
        {personExternals.youtube_id && (
          <Link
            to={`https://www.youtube.com/@${personExternals?.youtube_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent">
            <FaYoutube className="w-10 h-10 text-red-800" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ExternalLinks;
