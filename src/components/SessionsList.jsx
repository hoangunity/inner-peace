import SessionsListItem from "./SessionsListItem";

function SessionsList({ sessions }) {
  let renderedSessionItem = sessions?.map((session) => {
    return <SessionsListItem key={session.session_id} session={session} />;
    // return <div key={session.session_id}>{session.track_title}</div>;
  });

  return <div>{renderedSessionItem}</div>;
}

export default SessionsList;
