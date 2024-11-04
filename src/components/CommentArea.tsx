export const CommentArea = () => (
  <div className="comment-area rounded-lg  p-4 mt-4">
    <div className="flex justify-center">
      <textarea
        className="comment-textarea w-full md:w-3/4 lg:w-2/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[100px]"
        placeholder="Add a comment..."
      />
    </div>
    <div className="flex justify-end mt-3 md:w-5/6  space-x-2">
      <button className="cancel-button px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg transition duration-150 ease-in-out">
        Cancel
      </button>
      <button className="comment-button px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out">
        Post
      </button>
    </div>
  </div>
);
