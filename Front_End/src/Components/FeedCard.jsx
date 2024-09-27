
import { AiFillLike } from "react-icons/ai";
import PropTypes from 'prop-types';


// eslint-disable-next-line react/prop-types
const FeedCard = ({ post}) => {

const getMediaType = (url) => {
        const extension = url.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
            return 'image';
        } else if (['mp4', 'webm', 'ogg'].includes(extension)) {
            return 'video';
        } else {
            return 'unsupported';
        }
    };

    const usernameConverter = (email) =>{
        const username = email.split('@')[0];
        return username;
    }

    const mediaType = getMediaType(post.mediaFile);

  return (
    <div className="bg-white border-2 rounded-lg shadow-md flex">
      <div className="w-[10%] h-[10%] flex justify-center items-start p-4">
        <img
          src="https://img.icons8.com/?size=100&id=YABoRANFP0sq&format=png&color=000000"
          alt="profile"
          width={50}
          height={50}
          className="rounded-full border-red-600 w-10 h-10 bg-slate-50"
        />
      </div>
      <div className="w-[90%] pb-5 pr-2 py-4">
        <div>
          <h3 className="text-xl font-bold">{usernameConverter(post.added_by.email)}</h3>
          <p className="text-gray-400">{post.post}</p>
        </div>
        <div className='my-4'>
            {mediaType === 'image' && (
                <img src={post.mediaFile} alt="Media" style={{ maxWidth: '100%' }} />
            )}
            {mediaType === 'video' && (
                <video controls style={{ maxWidth: '100%' }}>
                    <source src={post.mediaFile} type={`video/${post.mediaFile.split('.').pop()}`} />
                    Your browser does not support the video tag.
                </video>
            )}
            {mediaType === 'unsupported' && (
                <p>Unsupported media type.</p>
            )}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center ">
          <div className="flex gap-4 mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <AiFillLike className="text-2xl" />
              <span>200</span>
            </div>
          </div>
          <div className="flex gap-4 pr-5">
            <div className='bg-[#F87315] text-white rounded-lg px-3 py-1 hover:bg-orange-700'>
                <button>Connect</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FeedCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    post: PropTypes.string.isRequired,
    mediaFile: PropTypes.string.isRequired,
    added_by: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      confirmEmail: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      confirmPassword: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      dateOfBirth: PropTypes.string.isRequired,
      selectedTopics: PropTypes.arrayOf(PropTypes.string),
      data: PropTypes.array,
      __v: PropTypes.number
    }).isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    __v: PropTypes.number
  }).isRequired
};

export default FeedCard;