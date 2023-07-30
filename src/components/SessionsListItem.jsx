function SessionsListItem({ session }) {
  const {
    email,
    file_url,
    image_url,
    phone_number,
    role,
    session_id,
    session_title,
    track_id,
    track_title,
    username,
  } = session;
  return (
    <div className="border p-2 grid grid-cols-[2fr_1fr_150px] auto-rows-max gap-x-2">
      {/* SESSION INFORMATION */}
      <div className="bg-red-400 flex flex-col gap-1">
        <h2 className="text-xl font-medium">
          <strong>Track Title:</strong> <em>{track_title}</em>
        </h2>
        <p>
          <strong>Session Title:</strong> <em>{session_title}</em>
        </p>
        <p>
          <strong>Session Owner:</strong> <em>{username}</em>
        </p>
      </div>

      {/* ACTIONS CONTAINER */}
      <div>ACTION AREA</div>

      {/* IMAGE */}
      <div className="h-max w-max flex items-center justify-center">
        <img
          src={image_url}
          alt="Track Display Image"
          className="w-[150px] h-[150px] object-cover"
        />
      </div>
    </div>
  );
}

export default SessionsListItem;
